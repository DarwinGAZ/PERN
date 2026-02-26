import { RequestHandler, Response } from "express";
import {
    createUserService,
    deleteUserService,
    getAllUsersService,
    getUserByEmailService,
    getUserById,
    updateUserRoleService,
    updateUserService,
} from "../services/userService";
import {
    createUserSchema,
    loginUserSchema,
    updateUserRoleSchema,
    updateUserSchema,
} from "../schemas/userSchema";
import { compare } from "bcrypt";
import dotenv from "dotenv";
import { createJWT } from "../libs/jwt";
import { AuthRequest } from "../types/AuthType";

dotenv.config();

export const getAllUsers: RequestHandler = async (req, res) => {
    const users = await getAllUsersService();

    if (!users || users.length === 0) {
        return res.status(204).json({ message: "Nenhum usuário encontrado" });
    }

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

export const deleteUser: RequestHandler = async (req, res) => {
    const id = req.params.id;

    const user = await deleteUserService(id as string);

    return res.status(200).json({
        message: "Usuário deletado com sucesso",
        user,
    });
};

export const updateUser = async (req: AuthRequest, res: Response) => {
    const data = await updateUserSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const updatedUser = await updateUserService(req.userId as string, {
        ...(data.data.email && { email: data.data.email }),
        ...(data.data.name && { name: data.data.name }),
        ...(data.data.password && { password: data.data.password }),
    });
    return res.status(200).json({ updatedUser });
};

export const updateUserRole = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    const data = await updateUserRoleSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const updatedUser = await updateUserRoleService(
        id as string,
        data.data.role,
    );

    return res.status(200).json({ updatedUser });
};
