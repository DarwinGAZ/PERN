import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
    id: string;
    content: string;
    createdAt: string;
    sender: { id: string; name: string };
}

export function useChat(serviceId: string) {
    const [messages, setMessages] = useState<Message[]>([]);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((r) => r.startsWith("token="))
            ?.split("=")[1];

        const socket = io("http://localhost:3000", {
            auth: { token },
        });

        socketRef.current = socket;

        socket.emit("join_room", serviceId);
        socket.emit("get_history", serviceId);

        socket.on("history", (msgs: Message[]) => setMessages(msgs));

        socket.on("new_message", (msg: Message) =>
            setMessages((prev) => [...prev, msg]),
        );

        return () => {
            socket.disconnect();
        };
    }, [serviceId]);

    const sendMessage = (content: string) => {
        socketRef.current?.emit("send_message", { serviceId, content });
    };

    return { messages, sendMessage };
}
