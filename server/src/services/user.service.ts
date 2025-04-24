import { CreateUser, PatchUser } from "../models";
import * as userRepository from "../repositories/user.repository";
import * as authService from "./auth.service";

export async function getUserById(id: string) {
  return userRepository.getUserById(id);
}

export async function createUser(user: CreateUser) {
  const hashedPassword = await authService.hashPassword(user.password);
  const userToCreate = {
    ...user,
    password: hashedPassword,
    createdAt: new Date(),
  };
  return userRepository.createUser(userToCreate);
}

export async function patchUserById(id: string, updates: PatchUser) {
  const userToUpdate = await getUserById(id);
  const patchedUser = {
    ...userToUpdate,
    ...updates,
    updatedAt: new Date(),
  };
  return userRepository.patchUserById(id, patchedUser);
}

export async function deleteUserById(id: string) {
  await getUserById(id);
  return userRepository.deleteUserById(id);
}
