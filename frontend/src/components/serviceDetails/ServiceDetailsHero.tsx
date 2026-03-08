import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import type { Service } from "@/types/ServiceType";
import { statusConfig } from "@/utils/serviceStatus";

interface Props {
    service: Service;
}

export function ServiceDetailsHero({ service }: Props) {
    const status = statusConfig[service.status];

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">Serviço</Badge>
                        <Badge variant="outline" className={status.className}>
                            {status.label}
                        </Badge>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        {service.title}
                    </h1>
                </div>

                <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Valor</p>
                    <p className="text-4xl font-bold">
                        R$ <span className="text-primary">{service.price}</span>
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <MapPin className="size-4 shrink-0" />
                <span>{service.location}</span>
            </div>
        </div>
    );
}
