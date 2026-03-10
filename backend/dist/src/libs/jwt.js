import jwt from "jsonwebtoken";
export const createJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};
export const verifyJWT = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token)
        return res.status(401).json({ error: "Acesso Negado" });
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error)
            return res.status(401).json({ error: "Acesso Negado" });
        req.userId = decoded.id;
        next();
    });
};
export const verifyJWTSocket = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token)
        return next(new Error("Não autorizado"));
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.data.userId = decoded.userId;
        next();
    }
    catch {
        next(new Error("Token inválido"));
    }
};
//# sourceMappingURL=jwt.js.map