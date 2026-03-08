import { MapPin, Tag } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

type CreateServicePreviewProps = {
    watchedTitle: string;
    watchedDescription: string;
    watchedPrice: number;
    watchedLocation: string;
};

function CreateServicePreview({
    watchedTitle,
    watchedDescription,
    watchedPrice,
    watchedLocation,
}: CreateServicePreviewProps) {
    return (
        <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Preview do card
                </p>

                <Card className="border shadow-sm transition-all duration-300">
                    <CardContent className="pt-5 pb-5 space-y-4">
                        {/* Topo */}
                        <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-base leading-snug line-clamp-2">
                                {watchedTitle || (
                                    <span className="text-muted-foreground/50 font-normal italic">
                                        Título do serviço
                                    </span>
                                )}
                            </p>
                            <Badge
                                variant="secondary"
                                className="shrink-0 text-xs"
                            >
                                Serviço
                            </Badge>
                        </div>

                        {/* Descrição */}
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {watchedDescription || (
                                <span className="italic opacity-50">
                                    Descrição aparece aqui…
                                </span>
                            )}
                        </p>

                        <Separator />

                        {/* Preço e localização */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <Tag className="size-3.5 text-muted-foreground" />
                                <span className="text-lg font-bold text-foreground">
                                    {watchedPrice ? (
                                        `R$ ${Number(watchedPrice).toFixed(2)}`
                                    ) : (
                                        <span className="text-sm font-normal text-muted-foreground/50 italic">
                                            R$ 0,00
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                                <MapPin className="size-3.5 shrink-0" />
                                <span className="truncate max-w-24">
                                    {watchedLocation || (
                                        <span className="italic opacity-50">
                                            Localização
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Botão mock */}
                        <div className="w-full h-9 rounded-md bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                            Ver Detalhes
                        </div>
                    </CardContent>
                </Card>

                <p className="text-xs text-muted-foreground text-center">
                    Assim seu serviço aparece para os clientes.
                </p>
            </div>
        </div>
    );
}

export default CreateServicePreview;
