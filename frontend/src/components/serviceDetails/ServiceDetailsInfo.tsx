import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Tag, MapPin, Clock } from "lucide-react";
import type { Service } from "@/types/ServiceType";

interface Props {
    service: Service;
}

export function ServiceDetailsInfo({ service }: Props) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <FileText className="size-4" />
                        Sobre o serviço
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {service.description}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Informações</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                            <Tag className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Preço
                            </p>
                            <p className="font-semibold">R$ {service.price}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                            <MapPin className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Localização
                            </p>
                            <p className="font-semibold">{service.location}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                            <Clock className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Prazo médio
                            </p>
                            <p className="font-semibold">A combinar</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
