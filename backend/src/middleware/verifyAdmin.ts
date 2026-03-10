import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/AuthType.js";
import { getUserById } from "../services/userService.js";

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
