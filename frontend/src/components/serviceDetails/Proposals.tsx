import api from "@/services/axios";
import type { ProposalWithApplicant } from "@/types/ProposalType";
import type { Service } from "@/types/ServiceType";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import ProposalItemDetails from "./ProposalItem";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { CheckCircle, XCircle } from "lucide-react";

function ServiceProposals({ service }: { service: Service }) {
    const [proposals, setProposals] = useState<ProposalWithApplicant[]>([]);
    const [selected, setSelected] = useState<ProposalWithApplicant | null>(
        null,
    );
    const [action, setAction] = useState<"accept" | "reject" | null>(null);

    useEffect(() => {
        api.get<ProposalWithApplicant[]>(
            `/services/${service.id}/proposals`,
        ).then((res) => setProposals(res.data));
    }, [service.id]);

    const openDialog = (
        proposal: ProposalWithApplicant,
        type: "accept" | "reject",
    ) => {
        setSelected(proposal);
        setAction(type);
    };

    const closeDialog = () => {
        setSelected(null);
        setAction(null);
    };

    const handleConfirm = async () => {
        if (!selected || !action) return;

        try {
            await api.patch(`/proposals/${selected.id}/${action}`);

            setProposals((prev) =>
                prev.map((p) => {
                    if (p.id === selected.id)
                        return {
                            ...p,
                            status:
                                action === "accept" ? "ACCEPTED" : "REJECTED",
                        };

                    // se aceitou, rejeita as outras na tela também
                    if (action === "accept")
                        return { ...p, status: "REJECTED" };

                    return p;
                }),
            );
        } catch (error) {
            console.error("Erro ao atualizar proposta:", error);
        } finally {
            closeDialog();
        }
    };

    const isAccept = action === "accept";

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
            <Separator />
            <h2 className="text-lg font-semibold">Propostas recebidas</h2>

            {proposals.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    Nenhuma proposta recebida ainda.
                </p>
            ) : (
                proposals.map((p) => (
                    <ProposalItemDetails
                        key={p.id}
                        proposal={p}
                        onAccept={() => openDialog(p, "accept")}
                        onReject={() => openDialog(p, "reject")}
                    />
                ))
            )}

            <AlertDialog open={!!selected} onOpenChange={closeDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            {isAccept ? (
                                <CheckCircle className="size-5 text-green-500" />
                            ) : (
                                <XCircle className="size-5 text-destructive" />
                            )}
                            {isAccept ? "Aceitar proposta" : "Recusar proposta"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {isAccept
                                ? `Tem certeza que deseja aceitar a proposta de ${selected?.applicant?.name}? As demais propostas serão recusadas automaticamente.`
                                : `Tem certeza que deseja recusar a proposta de ${selected?.applicant?.name}? Essa ação não pode ser desfeita.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirm}
                            className={
                                isAccept
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-destructive hover:bg-destructive/90"
                            }
                        >
                            {isAccept ? "Aceitar" : "Recusar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default ServiceProposals;
