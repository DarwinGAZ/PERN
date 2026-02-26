import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/AuthType";
import prisma from "../libs/prisma";
import { getUserById } from "../services/userService";

export const verifyAdmin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const user = await getUserById(req.userId as string);

    if (user?.role !== "ADMIN") {
        return res.status(403).json({ error: "Acesso negado" });
    }

    next();
};
