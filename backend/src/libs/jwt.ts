import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const createJWT = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
    });
};

export const verifyJWT: RequestHandler = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "Acesso Negado" });

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (error, decoded: any) => {
            if (error) return res.status(401).json({ error: "Acesso Negado" });

            next();
        },
    );
};
