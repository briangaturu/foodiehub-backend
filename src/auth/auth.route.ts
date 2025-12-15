import { Router } from "express";
import { createUser, loginUser, updatePassword, passwordReset } from "./auth.controller";

export const authRouter = Router();

// Auth routes definition
// Register a new user
authRouter.post('/auth/register', createUser);
authRouter.post('/auth/login', loginUser);
authRouter.put('/auth/update', updatePassword);
authRouter.post('/auth/password-reset', passwordReset);