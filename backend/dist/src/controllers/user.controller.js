import { createUserService, deleteUserService, getAllUsersService, getUserByEmailService, getUserById, updateUserRoleService, updateUserService, } from "../services/userService.js";
import { createUserSchema, loginUserSchema, updateUserRoleSchema, updateUserSchema, } from "../schemas/userSchema.js";
import { compare } from "bcrypt";
import dotenv from "dotenv";
import { createJWT } from "../libs/jwt.js";
dotenv.config();
export const getAllUsers = async (req, res) => {
    const users = await getAllUsersService();
    if (!users || users.length === 0) {
        return res.status(204).json({ message: "Nenhum usuário encontrado" });
    }
    return res.json(users);
};
export const createNewUser = async (req, res) => {
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
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "Usuário criado com sucesso!" });
};
export const login = async (req, res) => {
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
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login realizado com sucesso!" });
};
export const getUser = async (req, res) => {
    const id = req.userId;
    if (!id) {
        return res.status(406).json({ error: "Id não fornecido" });
    }
    const user = await getUserById(id);
    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const { password, ...userWithoutPassword } = user;
    return res.status(200).json(userWithoutPassword);
};
export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout realizado com sucesso!" });
};
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await deleteUserService(id);
    return res.status(200).json({
        message: "Usuário deletado com sucesso",
        user,
    });
};
export const updateUser = async (req, res) => {
    const data = await updateUserSchema.safeParse(req.body);
    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }
    const updatedUser = await updateUserService(req.userId, {
        ...(data.data.email && { email: data.data.email }),
        ...(data.data.name && { name: data.data.name }),
        ...(data.data.password && { password: data.data.password }),
    });
    return res.status(200).json({ updatedUser });
};
export const updateUserRole = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "ID do usuário não fornecido" });
    }
    const data = await updateUserRoleSchema.safeParse(req.body);
    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }
    const updatedUser = await updateUserRoleService(id, data.data.role);
    return res.status(200).json({ updatedUser });
};
//# sourceMappingURL=user.controller.js.map