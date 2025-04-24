import { Context } from "hono";
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
