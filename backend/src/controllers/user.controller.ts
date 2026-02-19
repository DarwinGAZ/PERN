import { RequestHandler, Response } from "express";
import {
    createUserService,
    getAllUsersService,
    getUserByEmailService,
    getUserById,
} from "../services/userService";
import { createUserSchema, loginUserSchema } from "../schemas/userSchema";
import { compare } from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { createJWT } from "../libs/jwt";
import { AuthRequest } from "../types/AuthType";

dotenv.config();

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

    const existingUser = await getUserByEmailService(validatedData.email);

    if (existingUser) {
        return res
            .status(400)
            .json({ error: "Uma conta com esse email já existe!" });
    }

    const newUser = await createUserService(validatedData);

    const token = createJWT(newUser.id);

    return res.status(201).json({ newUser, token });
};

export const login: RequestHandler = async (req, res) => {
    const data = await loginUserSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const validatedData = data.data;

    const user = await getUserByEmailService(validatedData.email);

    if (!user) {
        return res.status(401).json({ error: "Email ou senha inválido(s)" });
    }

    const matchPass = await compare(validatedData.password, user.password);

    if (!matchPass) {
        return res.status(401).json({ error: "Email ou senha inválido(s)" });
    }

    const token = createJWT(user.id);

    res.status(200).json({ user, token });
};

export const getUser = async (req: AuthRequest, res: Response) => {
    const id = req.userId;

    if (!id) {
        return res.status(406).json({ error: "Ocorreu um erro" });
    }

    const user = await getUserById(id);

    return res.status(200).json({ user });
};
