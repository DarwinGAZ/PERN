import { MapPin, Tag } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import type { Service } from "@/types/ServiceType";
import { DropdownMenuIcons } from "../DropDown";
import { Badge } from "../ui/badge";
import { statusConfig } from "@/utils/serviceStatus";

function ServiceItem({ service }: { service: Service }) {
    const status = statusConfig[service.status];

    return (
        <Card className="transition-all duration-200 hover:shadow-md cursor-pointer hover:-translate-y-0.5">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">
                        {service.title}
                    </CardTitle>
                    <Badge variant="secondary" className={status.className}>
                        {status.label}
                    </Badge>
                </div>
                <CardDescription className="line-clamp-2 text-sm">
                    {service.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Separator className="mb-3" />
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Tag className="size-3.5" />
                        <span className="font-bold text-foreground text-base">
                            R$ {service.price}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="size-3.5" />
                        <span>{service.location}</span>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <DropdownMenuIcons
                        className="w-full"
                        id={service.id}
                        service={service}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceItem;
