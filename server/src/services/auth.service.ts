import { logger } from "../common/logger";
import { SignJWT, jwtVerify } from "jose";
import { CreateUser, FetchUser } from "../models/User";
import * as userRepository from "../repositories/user.repository";
import * as emailService from "./email.service";
import * as storageService from "../services/storage.service";
import * as userService from "../services/user.service";
import { EmailIntegrationError } from "../common/errors";

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";
const encoder = new TextEncoder();
const secret = encoder.encode(SECRET_KEY);

/**
 * Generate a JWT for a user.
 * @param user - The user object (e.g., from the database).
 * @returns A signed JWT.
 */
export async function generateToken(user: FetchUser): Promise<string> {
  const payload = {
    sub: user.id.toString(),
    username: user.username,
    email: user.email,
    iss: "cosmereview-api",
  };

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

/**
 * Verify a JWT and return the decoded payload.
 * @param token - The JWT to verify.
 * @returns The decoded payload if valid, or null if invalid.
 */
export async function verifyToken(token: string): Promise<FetchUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as FetchUser;
  } catch {
    return null;
  }
}

/**
 * Register a new user by hashing the password and saving to the database.
 * @param password - The raw user password to hash.
 * @returns The hashed password string.
 */
export async function hashPassword(password: string) {
  return Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 4,
  });
}

/**
 * Login a user by verifying email and password.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A JWT if login is successful.
 */
export async function login(email: string, password: string): Promise<string> {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await Bun.password.verify(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return await generateToken(user);
}

/**
 * Register a new user by creating a new user in the database and sending a registration email.
 * @param data - The user data to register.
 */
export async function register(userToCreate: CreateUser, image?: File) {
  if (image && image instanceof File) {
    const filename = `user_images/${image.name}`;
    const publicUrl = await storageService.uploadImage(image, filename);
    userToCreate.image = publicUrl;
  }
  await userService.createUser(userToCreate);
  const { data, error } = await emailService.sendRegistrationEmail(
    userToCreate.email
  );

  if (error) {
    throw new EmailIntegrationError(error.message);
  }
  return data;
}
