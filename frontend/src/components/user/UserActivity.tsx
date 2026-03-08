import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { FileText, Briefcase, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import ProposalItem from "./UserProposalItem";
import ServiceItem from "./UserServiceItem";
import type { Service } from "@/types/ServiceType";
import type { Proposal } from "@/types/ProposalType";

interface UserActivityProps {
    services: Service[];
    proposals: Proposal[];
}

export function UserActivity({ services, proposals }: UserActivityProps) {
    const navigate = useNavigate();

    return (
        <div className="flex-1 min-w-0">
            <Tabs defaultValue="services">
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                    <TabsList>
                        <TabsTrigger value="services" className="gap-2">
                            <Briefcase className="size-3.5" />
                            Meus Serviços
                        </TabsTrigger>
                        <TabsTrigger value="proposals" className="gap-2">
                            <FileText className="size-3.5" />
                            Propostas Enviadas
                        </TabsTrigger>
                    </TabsList>

                    <Button
                        onClick={() => navigate("/createService")}
                        size="sm"
                        variant="outline"
                        className="gap-2"
                    >
                        <Plus className="size-4" />
                        Novo
                    </Button>
                </div>

                {/* Services tab */}
                <TabsContent value="services">
                    {services.length === 0 ? (
                        <Empty className="w-full mt-6">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <Briefcase className="size-6 text-muted-foreground" />
                                </EmptyMedia>
                                <EmptyTitle>Nenhum serviço ainda</EmptyTitle>
                                <EmptyDescription>
                                    Você ainda não cadastrou nenhum serviço.
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent />
                        </Empty>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {services.map((s) => (
                                <ServiceItem key={s.id} service={s} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* Proposals tab */}
                <TabsContent value="proposals">
                    {proposals.length === 0 ? (
                        <Empty className="w-full mt-6">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <FileText className="size-6 text-muted-foreground" />
                                </EmptyMedia>
                                <EmptyTitle>
                                    Nenhuma proposta enviada
                                </EmptyTitle>
                                <EmptyDescription>
                                    Você ainda não enviou nenhuma proposta.
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent />
                        </Empty>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {proposals.map((p) => (
                                <ProposalItem key={p.id} proposal={p} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
