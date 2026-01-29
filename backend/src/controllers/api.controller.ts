import { RequestHandler } from "express";

export const api: RequestHandler = (req, res) => {
    res.status(200).json({ message: "API funcionando 🚀" });
};
