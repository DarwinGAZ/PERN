import api from "@/services/axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Service } from "@/types/ServiceType";
import Loading from "@/components/layouts/Loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Zap } from "lucide-react";
import { ServiceDetailsHero } from "@/components/serviceDetails/ServiceDetailsHero";
import { ServiceDetailsInfo } from "@/components/serviceDetails/ServiceDetailsInfo";
import { ServiceDetailsActions } from "@/components/serviceDetails/ServiceDetailsActions";
import { AuthContext } from "@/context/AuthContext";
import ServiceProposals from "@/components/serviceDetails/Proposals";

function ServiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState<Service | null>(null);
    const authCtx = useContext(AuthContext);
    const isOwner = authCtx?.user?.id === service?.ownerId;

    useEffect(() => {
        api.get(`/services/${id}`)
            .then((res) => setService(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!service) return <Loading />;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(-1)}
                        className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="size-4" />
                        Voltar
                    </Button>
                    <Separator orientation="vertical" className="h-5" />
                    <div className="flex items-center gap-2">
                        <div className="size-5 rounded bg-primary flex items-center justify-center">
                            <Zap className="size-3 text-primary-foreground" />
                        </div>
                        <span className="text-sm font-semibold">
                            Conecta<span className="text-primary">Pro</span>
                        </span>
                    </div>
                    <Separator orientation="vertical" className="h-5" />
                    <span className="text-sm text-muted-foreground truncate">
                        {service.title}
                    </span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
                <ServiceDetailsHero service={service} />

                <Separator />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ServiceDetailsInfo service={service} />
                    </div>

                    <div>
                        <ServiceDetailsActions
                            serviceId={id!}
                            serviceTitle={service.title}
                        />
                    </div>
                </div>
            </div>
            {isOwner && <ServiceProposals service={service} />}
        </div>
    );
}

export default ServiceDetails;
