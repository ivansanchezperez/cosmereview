import { Hono } from "hono";
import { loginController } from "../controllers/auth.controller";

export const authRoutes = new Hono();

authRoutes.post("/login", loginController);
