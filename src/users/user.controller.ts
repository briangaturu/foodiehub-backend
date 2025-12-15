import { Request, Response } from "express";
import {
  createUserServices,
  deleteUserServices,
  getUserByIdServices,
  getUsersServices,
  updateUserServices,
} from "./user.service";

// GET all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await getUsersServices();
    res.status(200).json({
      message: "Users fetched successfully",
      data: allUsers,
    });
  } catch (error: any) {
     res.status(500).json({ error: error.message || "Failed to fetch users" });
  }
};

// GET single user by ID
export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await getUserByIdServices(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch user" });
  }
};

// POST create user
export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
     res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newUser = await createUserServices({ firstName, lastName, email, password });
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create user" });
  }
};

// PUT update user
export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
  }

  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email) {
    res.status(400).json({ error: "First name, last name, and email are required" });
  }

  try {
    const updatedUser = await updateUserServices(userId, {
      firstName,
      lastName,
      email,
      password, // optional: only update if present
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found or failed to update" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update user" });
  }
};

// DELETE user
export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const deletedUser = await deleteUserServices(userId);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete user" });
  }
};
