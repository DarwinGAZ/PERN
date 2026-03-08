import { useEffect, useRef, useState } from "react";
import api from "@/services/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, MessageCircle, Send } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface Props {
    serviceId: string;
    serviceTitle: string;
}

interface Message {
    id: string;
    content: string;
    createdAt: string;
    sender: { id: string; name: string };
}

function getTokenFromCookie() {
    return (
        document.cookie
            .split("; ")
            .find((r) => r.startsWith("token="))
            ?.split("=")[1] ?? null
    );
}

export function ServiceDetailsActions({ serviceId, serviceTitle }: Props) {
    // proposta
    const [proposalMessage, setProposalMessage] = useState("");
    const [proposalValue, setProposalValue] = useState<number>(0);
    const [proposalError, setProposalError] = useState<string | null>(null);
    const [proposalSuccess, setProposalSuccess] = useState(false);

    // chat
    const [chatMessage, setChatMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatOpen, setChatOpen] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    // conecta o socket quando o dialog de chat abre
    useEffect(() => {
        if (!chatOpen) {
            socketRef.current?.disconnect();
            socketRef.current = null;
            return;
        }

        const token = getTokenFromCookie();

        const socket = io("http://localhost:3333", {
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
    }, [chatOpen, serviceId]);

    // scroll automático para a última mensagem
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendProposal = async () => {
        setProposalError(null);
        try {
            await api.post(`/services/${serviceId}/createProposal`, {
                message: proposalMessage,
                price: proposalValue,
            });
            setProposalSuccess(true);
            setProposalMessage("");
            setProposalValue(0);
        } catch (error: any) {
            const errData = error?.response?.data?.error;
            const msg =
                typeof errData === "string"
                    ? errData
                    : (errData?.message?.[0] ?? "Erro ao enviar proposta");
            setProposalError(msg);
        }
    };

    const handleSendChat = () => {
        if (!chatMessage.trim()) return;
        socketRef.current?.emit("send_message", {
            serviceId,
            content: chatMessage,
        });
        setChatMessage("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendChat();
        }
    };

    return (
        <Card className="sticky top-20">
            <CardHeader>
                <CardTitle className="text-base">Interessado?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Enviar Proposta */}
                <Dialog
                    onOpenChange={() => {
                        setProposalError(null);
                        setProposalSuccess(false);
                    }}
                >
                    <DialogTrigger asChild>
                        <Button className="w-full gap-2">
                            <FileText className="size-4" />
                            Enviar Proposta
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Enviar Proposta</DialogTitle>
                            <DialogDescription>
                                Descreva sua proposta para "{serviceTitle}"
                            </DialogDescription>
                        </DialogHeader>

                        {proposalSuccess ? (
                            <div className="py-6 text-center space-y-2">
                                <p className="text-green-600 font-semibold">
                                    Proposta enviada com sucesso!
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    O prestador será notificado em breve.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4 py-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="valor">
                                            Seu valor (R$)
                                        </Label>
                                        <Input
                                            id="valor"
                                            type="number"
                                            placeholder="Ex: 150,00"
                                            value={proposalValue}
                                            onChange={(e) =>
                                                setProposalValue(
                                                    parseFloat(
                                                        e.target.value,
                                                    ) || 0,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="mensagem">
                                            Mensagem
                                        </Label>
                                        <Textarea
                                            id="mensagem"
                                            placeholder="Descreva sua proposta, experiência e disponibilidade..."
                                            className="min-h-28 resize-none"
                                            value={proposalMessage}
                                            onChange={(e) =>
                                                setProposalMessage(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button
                                        onClick={handleSendProposal}
                                        className="gap-2 w-full"
                                        disabled={!proposalMessage.trim()}
                                    >
                                        <Send className="size-4" />
                                        Enviar Proposta
                                    </Button>
                                </DialogFooter>

                                {proposalError && (
                                    <p className="text-sm text-red-500 text-center -mt-2">
                                        {proposalError}
                                    </p>
                                )}
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Conversar */}
                <Dialog open={chatOpen} onOpenChange={setChatOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full gap-2">
                            <MessageCircle className="size-4" />
                            Conversar
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Conversa</DialogTitle>
                            <DialogDescription>
                                Chat sobre "{serviceTitle}"
                            </DialogDescription>
                        </DialogHeader>

                        {/* histórico de mensagens */}
                        <div className="h-64 overflow-y-auto flex flex-col gap-2 border rounded-md p-3 bg-muted/30">
                            {messages.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center my-auto">
                                    Nenhuma mensagem ainda.
                                </p>
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg.id} className="text-sm">
                                        <span className="font-semibold">
                                            {msg.sender.name}:{" "}
                                        </span>
                                        <span>{msg.content}</span>
                                    </div>
                                ))
                            )}
                            <div ref={bottomRef} />
                        </div>

                        <div className="space-y-2">
                            <Textarea
                                placeholder="Digite sua mensagem... (Enter para enviar)"
                                className="min-h-20 resize-none"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                onClick={handleSendChat}
                                className="gap-2 w-full"
                                disabled={!chatMessage.trim()}
                            >
                                <Send className="size-4" />
                                Enviar Mensagem
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
