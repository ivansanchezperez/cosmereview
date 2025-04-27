import { Context } from "hono";
import { logger } from "../common/logger";
import { EntityNotFound } from "../common/errors";
import { userPatchSchema, userSchema } from "../schemas/user.schema";
import * as userService from "../services/user.service";
import * as storageService from "../services/storage.service";

export async function getUserByIdController(c: Context) {
  try {
    const userId = c.req.param("id");
    logger.info(`Getting user by id ${userId}`);
    const user = await userService.getUserById(userId);
    logger.info("Got user successfully");
    return c.json(user, 200);
  } catch (error) {
    logger.error("Error getting user", error);
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function createUserController(c: Context) {
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

    if (image && image instanceof File) {
      const filename = `user_images/${image.name}`;
      const publicUrl = await storageService.uploadImage(image, filename);
      data.image = publicUrl;
    }

    const user = await userService.createUser(data);
    logger.info("Created user successfully");
    return c.json(user, 201);
  } catch (error) {
    logger.error("Error creating user", error);
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function patchUserByIdController(c: Context) {
  try {
    const userId = c.req.param("id");
    const body = await c.req.json();
    logger.info(`Patching user by id ${userId}`);

    const { success, data, error } = userPatchSchema.safeParse({
      ...body,
    });

    if (!success) {
      logger.error("Validation error", error);
      return c.json({ error: error.errors }, 400);
    }

    await userService.patchUserById(userId, data);
    const user = await userService.getUserById(userId);
    logger.info("Patched user successfully");
    return c.json(user, 200);
  } catch (error) {
    logger.error("Error patching user", error);
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function deleteUserByIdController(c: Context) {
  try {
    const userId = c.req.param("id");
    logger.info(`Deleting user by id ${userId}`);

    await userService.deleteUserById(userId);

    logger.info("Deleted user successfully");
    return c.json({ message: "User deleted successfully" }, 200);
  } catch (error) {
    logger.error("Error deleting user", error);
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
