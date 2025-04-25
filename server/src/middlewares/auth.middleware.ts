import { Context, Next } from "hono";
import { verifyToken } from "../services/auth.service";

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return c.json({ error: "No token provided" }, 401);
  }

  try {
    const decoded = await verifyToken(token);
    if (!decoded) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    c.set("user", decoded);
    await next();
  } catch (err) {
    return c.json({ error: "Unauthorized" }, 401);
  }
}
