import { Hono } from "hono";

import { getUserByIdController, createUserController, deleteUserByIdController, patchUserByIdController } from "../controllers/user.controller";

export const userRoutes = new Hono();

userRoutes.get("/:id", getUserByIdController);
userRoutes.post("/", createUserController);
userRoutes.patch("/:id", patchUserByIdController);
userRoutes.delete("/:id", deleteUserByIdController);
