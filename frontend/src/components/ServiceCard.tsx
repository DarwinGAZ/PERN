import { MapPin, Tag } from "lucide-react";
import { Badge } from "./ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import type { Service } from "@/types/ServiceType";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }: { service: Service }) => {
    const navigate = useNavigate();

    return (
        <Card className="flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <CardHeader>
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg leading-snug">
                        {service.title}
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0">
                        Serviço
                    </Badge>
                </div>
                <CardDescription className="line-clamp-3">
                    {service.description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Separator className="mb-4" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                        <Tag className="size-3.5" />
                        <span className="text-xl font-bold text-foreground">
                            R$ {service.price}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                        <MapPin className="size-3.5 shrink-0" />
                        <span className="truncate max-w-30">
                            {service.location}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={() => navigate(`/services/${service.id}`)}
                    className="w-full"
                    variant="default"
                >
                    Ver Detalhes
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ServiceCard;
