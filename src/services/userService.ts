// src/services/userService.ts
import User, { IUser } from "../models/user";

export const getUserById = async (userId: string) => {
  return User.findById(userId);
};

export const updateUserById = async (
  userId: string,
  updates: Partial<IUser>
) => {
  return User.findByIdAndUpdate(userId, updates, { new: true });
};
