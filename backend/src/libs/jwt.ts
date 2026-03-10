import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/AuthType.js";

export const createJWT = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
    });
};

export const verifyJWT = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies?.token;

    if (!token) return res.status(401).json({ error: "Acesso Negado" });

    jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
        (error, decoded: any) => {
            if (error) return res.status(401).json({ error: "Acesso Negado" });

            req.userId = decoded.id;

            next();
        },
    );
};

export const verifyJWTSocket = (socket: any, next: any) => {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error("Não autorizado"));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: string;
        };
        socket.data.userId = decoded.userId;
        next();
    } catch {
        next(new Error("Token inválido"));
    }
};
