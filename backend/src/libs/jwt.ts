import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/AuthType";

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
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "Acesso Negado" });

    const token = authHeader.split(" ")[1];

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
