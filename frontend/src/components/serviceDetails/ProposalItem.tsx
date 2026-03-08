import { Check, Clock, Tag, User, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import type { Proposal, ProposalWithApplicant } from "@/types/ProposalType";
import { ProposalConfig } from "@/utils/proposalStatus";

interface Props {
    proposal: ProposalWithApplicant | Proposal;
    onAccept?: () => void;
    onReject?: () => void;
}

function ProposalItemDetails({ proposal, onAccept, onReject }: Props) {
    const applicantName =
        "applicant" in proposal
            ? proposal.applicant.name
            : "Usuário não encontrado";

    const formattedDate = new Date(proposal.createdAt).toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        },
    );

    const status = ProposalConfig[proposal.status];
    const isPending = proposal.status === "PENDING";

    return (
        <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">
                        {proposal.message}
                    </CardTitle>
                    <Badge className={status.className}>{status.label}</Badge>
                </div>
                <CardDescription className="text-sm" />
            </CardHeader>
            <CardContent>
                <Separator className="mb-3" />
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Tag className="size-3.5" />
                        <span>R$ {Number(proposal.price ?? 0).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="size-3.5" />
                        <span>{formattedDate}</span>
                    </div>
                </div>
                <Separator className="my-3" />
                <div className="flex items-center justify-between">
                    {applicantName && (
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <User className="size-3.5" />
                            <span>{applicantName}</span>
                        </div>
                    )}
                    {isPending && (onAccept || onReject) && (
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                                onClick={onReject}
                            >
                                <X className="size-3.5" />
                                Recusar
                            </Button>
                            <Button
                                size="sm"
                                className="gap-1.5 bg-green-600 hover:bg-green-700"
                                onClick={onAccept}
                            >
                                <Check className="size-3.5" />
                                Aceitar
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default ProposalItemDetails;
