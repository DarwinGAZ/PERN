import { createServiceSchema } from "@/schemas/ServiceSchema";
import api from "@/services/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type z from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    Briefcase,
    MapPin,
    Tag,
    FileText,
    Loader2,
    CheckCircle2,
    Zap,
} from "lucide-react";
import { LocationSelect } from "@/components/LocationSelect";
import CreateServicePreview from "@/components/CreateServicePreview";

type CreateServiceSchema = z.infer<typeof createServiceSchema>;

function CreateService() {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<CreateServiceSchema>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            location: "",
        },
    });

    const watchedTitle = form.watch("title");
    const watchedPrice = form.watch("price");
    const watchedLocation = form.watch("location");
    const watchedDescription = form.watch("description");

    const { isSubmitting } = form.formState;

    const handleSubmit = async (data: CreateServiceSchema) => {
        try {
            await api.post("/createService", data);
            setIsSuccess(true);
            setTimeout(() => navigate("/services"), 2000);
        } catch (error) {
            console.error("Erro ao criar serviço:", error);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center space-y-4">
                    <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="size-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Serviço publicado!</h2>
                    <p className="text-muted-foreground">
                        Seu serviço já está visível para todos. Redirecionando…
                    </p>
                </div>
            </div>
        );
    }

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
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-10">
                {/* Título da página */}
                <div className="mb-8 space-y-1">
                    <Badge variant="secondary" className="mb-2">
                        Novo serviço
                    </Badge>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Publique seu serviço
                    </h1>
                    <p className="text-muted-foreground">
                        Preencha as informações abaixo para que clientes possam
                        encontrar e contratar você.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    {/* ── FORMULÁRIO ── */}
                    <div className="lg:col-span-3">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="space-y-6"
                            >
                                {/* Título */}
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-sm font-semibold">
                                                <Briefcase className="size-3.5 text-muted-foreground" />
                                                Título do serviço
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex: Desenvolvimento de site em React"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Um título claro aumenta suas
                                                chances de ser encontrado.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Descrição */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-sm font-semibold">
                                                <FileText className="size-3.5 text-muted-foreground" />
                                                Descrição
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Descreva o que está oferecendo, sua experiência, diferenciais e o que está incluso no serviço..."
                                                    className="min-h-32 resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Quanto mais detalhado, melhor.
                                                Mínimo de 30 caracteres.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Preço + Localização lado a lado */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-sm font-semibold">
                                                    <Tag className="size-3.5 text-muted-foreground" />
                                                    Preço (R$)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        step={0.01}
                                                        placeholder="0,00"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                parseFloat(
                                                                    e.target
                                                                        .value,
                                                                ) || 0,
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-sm font-semibold">
                                                    <MapPin className="size-3.5 text-muted-foreground" />
                                                    Localização
                                                </FormLabel>
                                                <FormControl>
                                                    <LocationSelect
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Separator />

                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => navigate(-1)}
                                        disabled={isSubmitting}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 gap-2"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="size-4 animate-spin" />
                                                Publicando…
                                            </>
                                        ) : (
                                            <>
                                                <Zap className="size-4" />
                                                Publicar serviço
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>

                    <CreateServicePreview
                        watchedTitle={watchedTitle}
                        watchedDescription={watchedDescription}
                        watchedPrice={watchedPrice}
                        watchedLocation={watchedLocation}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateService;
