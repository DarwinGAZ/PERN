import { Clock, Tag } from "lucide-react";
import { Badge } from "../ui/badge";
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

function ProposalItem({
    proposal,
}: {
    proposal: ProposalWithApplicant | Proposal;
}) {
    const formattedDate = new Date(proposal.createdAt).toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        },
    );

    const status = ProposalConfig[proposal.status];

    return (
        <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">
                        {proposal.message}
                    </CardTitle>
                    <div>
                        <Badge className={status.className}>
                            {status.label}
                        </Badge>
                    </div>
                </div>
                <CardDescription className="text-sm"></CardDescription>
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
            </CardContent>
        </Card>
    );
}

export default ProposalItem;
