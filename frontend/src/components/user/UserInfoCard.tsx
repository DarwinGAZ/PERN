import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Hash, CalendarDays } from "lucide-react";

interface UserInfoCardProps {
    id: string;
    email: string;
    createdAt: string;
}

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-lg bg-muted shrink-0">
                <span className="text-muted-foreground">{icon}</span>
            </div>
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium truncate">{value}</p>
            </div>
        </div>
    );
}

export function UserInfoCard({ id, email, createdAt }: UserInfoCardProps) {
    const formattedDate = new Date(createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <Card>
            <CardContent className="pt-6 flex flex-col gap-4">
                <InfoRow
                    icon={<Mail className="size-4" />}
                    label="E-mail"
                    value={email}
                />
                <Separator />
                <InfoRow
                    icon={<Hash className="size-4" />}
                    label="ID da conta"
                    value={id}
                />
                <Separator />
                <InfoRow
                    icon={<CalendarDays className="size-4" />}
                    label="Membro desde"
                    value={formattedDate}
                />
            </CardContent>
        </Card>
    );
}
