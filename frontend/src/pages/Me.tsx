import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "@/components/layouts/Loading";
import { Container } from "@/components/layouts/Container";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { UserCircle } from "lucide-react";
import { UserSidebar } from "@/components/user/UserSidebar";
import { UserActivity } from "@/components/user/UserActivity";
import api from "@/services/axios";
import type { Service } from "@/types/ServiceType";
import type { Proposal } from "@/types/ProposalType";

function Me() {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const user = authCtx?.user;

    const [services, setServices] = useState<Service[]>([]);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        async function fetchAll() {
            try {
                const [servicesRes, proposalsRes] = await Promise.all([
                    api.get<Service[]>("/me/services"),
                    api.get<Proposal[]>("/me/proposals"),
                ]);
                setServices(servicesRes.data);
                setProposals(proposalsRes.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingData(false);
            }
        }
        if (user) fetchAll();
    }, [user]);

    if (authCtx?.isLoading || loadingData) {
        return <Loading />;
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Empty className="w-full max-w-sm">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <UserCircle className="size-6 text-muted-foreground" />
                        </EmptyMedia>
                        <EmptyTitle>Usuário não encontrado</EmptyTitle>
                        <EmptyDescription>
                            Não foi possível carregar os dados do perfil.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent />
                </Empty>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Page header */}
            <div className="border-b bg-muted/40">
                <Container className="py-10">
                    <p className="text-sm text-muted-foreground mb-1">Conta</p>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Meu Perfil
                    </h1>
                </Container>
            </div>

            {/* Body: activity (left) + sidebar (right) */}
            <Container className="py-10">
                <div className="flex flex-col-reverse lg:flex-row gap-8 items-start">
                    {/* Left — activity */}
                    <UserActivity services={services} proposals={proposals} />

                    {/* Right — profile sidebar */}
                    <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-6">
                        <UserSidebar
                            user={user}
                            servicesCount={services.length}
                            proposalsCount={proposals.length}
                            onLogout={() => {
                                authCtx?.logout();
                                navigate("/");
                            }}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Me;
