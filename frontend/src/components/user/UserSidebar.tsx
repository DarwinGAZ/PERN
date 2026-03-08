import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Hash, CalendarDays } from "lucide-react";
import { UserAvatar } from "./UserAvatar";
import { UserActions } from "./UserActions";

interface UserSidebarProps {
    user: {
        id: string;
        name: string;
        email: string;
        createdAt: string;
    };
    servicesCount: number;
    proposalsCount: number;
    onLogout: () => void;
}

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-8 rounded-lg bg-muted shrink-0">
                <span className="text-muted-foreground">{icon}</span>
            </div>
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium truncate">{value}</p>
            </div>
        </div>
    );
}

export function UserSidebar({
    user,
    servicesCount,
    proposalsCount,
}: UserSidebarProps) {
    const formattedDate = new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <aside className="flex flex-col gap-4 w-full">
            {/* Profile card */}
            <Card>
                <CardHeader className="items-center text-center pb-2">
                    <UserAvatar name={user.name} size="lg" />
                    <div className="mt-2">
                        <h2 className="text-xl font-bold tracking-tight">
                            {user.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                    <Badge variant="secondary" className="mt-1">
                        Usuário
                    </Badge>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 pt-2">
                    <Separator className="mb-1" />
                    <InfoRow
                        icon={<Mail className="size-3.5" />}
                        label="E-mail"
                        value={user.email}
                    />
                    <InfoRow
                        icon={<Hash className="size-3.5" />}
                        label="ID da conta"
                        value={user.id}
                    />
                    <InfoRow
                        icon={<CalendarDays className="size-3.5" />}
                        label="Membro desde"
                        value={formattedDate}
                    />
                </CardContent>
            </Card>

            {/* Stats card */}
            <Card>
                <CardContent className="pt-5">
                    <div className="grid grid-cols-2 divide-x text-center">
                        <div className="px-2">
                            <p className="text-2xl font-bold">
                                {servicesCount}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Serviços
                            </p>
                        </div>
                        <div className="px-2">
                            <p className="text-2xl font-bold">
                                {proposalsCount}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Propostas
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Actions */}
            <UserActions />
        </aside>
    );
}
