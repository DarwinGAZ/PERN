import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { Home, LogOut, Pencil, Trash } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditUserDialog } from "./UserEditDialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import api from "@/services/axios";

export function UserActions() {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const [editOpen, setEditOpen] = useState(false);
    const user = authCtx?.user;

    const handleDeleteUser = async () => {
        try {
            await api.delete(`/deleteUser/${user?.id}`);
            navigate("/");
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => navigate("/")}
            >
                <Home className="size-4" />
                Voltar para Home
            </Button>

            <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => setEditOpen(true)}
            >
                <Pencil />
                Editar Perfil
            </Button>

            <Button
                variant="destructive"
                className="w-full gap-2"
                onClick={authCtx?.logout}
            >
                <LogOut className="size-4" />
                Sair da conta
            </Button>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="mt-4" variant="destructive">
                        {" "}
                        <Trash />
                        Excluir Conta
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Você tem certeza que deseja excluir sua conta?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Essa ação é irreversível. Todos os seus dados,
                            serviços e propostas serão permanentemente
                            deletados. Se você tem certeza, clique em
                            "Continuar". Caso contrário, clique em "Cancelar".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteUser}>
                            Continuar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {user && (
                <EditUserDialog
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    user={user}
                />
            )}
        </div>
    );
}
