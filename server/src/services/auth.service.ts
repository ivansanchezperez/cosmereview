import { SignJWT, jwtVerify } from "jose";
import { FetchUser } from "../models/User";
import * as userRepository from "../repositories/user.repository";

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
    id: user.id,
    username: user.username,
    email: user.email,
  };

  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").sign(secret);
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
