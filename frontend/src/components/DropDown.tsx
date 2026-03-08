import { useState } from "react";
import { DialogDemo } from "./EditService";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenu } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Edit, Eye, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Service } from "@/types/ServiceType";
import api from "@/services/axios";

type DropdownMenuIconsProps = {
    service: Service;
    className?: string;
    id: string;
};

export function DropdownMenuIcons({
    className,
    service,
}: DropdownMenuIconsProps) {
    const navigate = useNavigate();
    const [editOpen, setEditOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await api.delete(`/deleteService/${service.id}`);
        } catch (error) {
            console.error("Erro ao deletar serviço:", error);
        }
    };
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className={className}>
                        Opções
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onSelect={() => navigate(`/services/${service.id}`)}
                    >
                        <Eye />
                        Ver Propostas
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={() => setEditOpen(true)}>
                        <Edit />
                        Editar
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="destructive"
                        onSelect={handleDelete}
                    >
                        <Trash />
                        Apagar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog fica fora do DropdownMenu */}
            <DialogDemo
                open={editOpen}
                onOpenChange={setEditOpen}
                service={service}
            />
        </>
    );
}
