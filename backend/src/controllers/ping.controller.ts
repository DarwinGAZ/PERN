import { RequestHandler } from "express";

export const ping: RequestHandler = (req, res) => {
    res.status(200).json({ message: "Ping" });
};
