import { Hono } from "hono";
import { loginController, registerController } from "../controllers/auth.controller";

export const authRoutes = new Hono();

authRoutes.post("/login", loginController);
authRoutes.post("/register", registerController);
