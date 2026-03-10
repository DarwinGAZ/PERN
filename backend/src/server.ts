import express from "express";
import cors from "cors";
import { routes } from "./routes/routes.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { verifyJWTSocket } from "./libs/jwt.js";
import prisma from "./libs/prisma.js";

const app = express();

app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:5173", "https://pern-blond.vercel.app"],
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173", "https://pern-blond.vercel.app"],
        credentials: true,
    },
});

io.use(verifyJWTSocket);

io.on("connection", (socket) => {
    const userId = socket.data.userId;

    socket.on("join_room", (serviceId: string) => {
        socket.join(serviceId);
    });

    socket.on("send_message", async ({ serviceId, content }) => {
        const message = await prisma.message.create({
            data: { content, senderId: userId, serviceId },
            include: { sender: { select: { id: true, name: true } } },
        });

        io.to(serviceId).emit("new_message", message);
    });

    socket.on("get_history", async (serviceId: string) => {
        const messages = await prisma.message.findMany({
            where: { serviceId },
            include: { sender: { select: { id: true, name: true } } },
            orderBy: { createdAt: "asc" },
        });

        socket.emit("history", messages);
    });
});

// httpServer no lugar do app.listen
httpServer.listen(3334, () => {
    console.log("Servidor rodando em http://localhost:3334");
});
