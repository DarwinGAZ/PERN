import { RequestHandler } from "express";
import {
    createUserService,
    getAllUsersService,
    getUserByEmail,
} from "../services/userService";
import { createUserSchema } from "../schemas/userSchema";
import bcrypt from "bcrypt";

export const getAllUsers: RequestHandler = async (req, res) => {
    const users = await getAllUsersService();

    return res.json(users);
};

export const createNewUser: RequestHandler = async (req, res) => {
    const data = await createUserSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const validatedData = data.data;

    const existingUser = await getUserByEmail(validatedData.email);

    if (existingUser) {
        return res.status(400).json({ error: "Usuário já existe!" });
    }

    const newUser = await createUserService(validatedData);

    return res.status(201).json({ newUser });
};
