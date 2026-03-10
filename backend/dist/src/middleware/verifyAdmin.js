import { getUserById } from "../services/userService.js";
export const verifyAdmin = async (req, res, next) => {
    const user = await getUserById(req.userId);
    if (user?.role !== "ADMIN") {
        return res.status(403).json({ error: "Acesso negado" });
    }
    next();
};
//# sourceMappingURL=verifyAdmin.js.map