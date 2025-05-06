import { Context } from "hono";
import { logger } from "../common/logger";
import { userSchema } from "../schemas/user.schema";
import * as authService from "../services/auth.service";

export async function loginController(c: Context) {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }
    // Call your login service here
    const token = await authService.login(email, password);
    return c.json({ token }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "Internal Server error" }, 500);
  }
}

export async function registerController(c: Context) {
  try {
    const formData = await c.req.formData();
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image");
    logger.info("Creating user");

    const { success, data, error } = userSchema.safeParse({
      username,
      email,
      password,
      image,
    });

    if (!success) {
      logger.error("Validation error", error);
      return c.json({ error: error.errors }, 400);
    }

    await authService.register(data);
    return c.json({ message: "User registered correctly" }, 201);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "Internal Server error" }, 500);
  }
}
