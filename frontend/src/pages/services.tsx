import { useEffect, useState } from "react";
import api from "../services/axios";
import Loading from "@/components/layouts/Loading";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import type { ServiceWithPage } from "@/types/ServiceType";
import { FilterPanel } from "@/components/FilterPanel";
import ServiceCard from "@/components/ServiceCard";
import { useNavigate } from "react-router-dom";
import { PaginationDemo } from "@/components/Pagination";

export const Services = () => {
    const [services, setServices] = useState<ServiceWithPage>({
        services: [],
        page: 1,
        total: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchServices() {
            setLoading(true);
            try {
                const res = await api.get<ServiceWithPage>(
                    `/services?page=${currentPage}`,
                );
                setServices(res.data);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchServices();
    }, [currentPage]);

    return (
        <div className="min-h-screen bg-background">
            {/* Page header */}
            <div className="border-b bg-muted/40">
                <Container className="py-10">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Serviços Disponiveis
                            </h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => navigate("/createService")}
                                size="sm"
                                variant="outline"
                                className="gap-2"
                            >
                                <Plus className="size-4" />
                                Criar Serviço
                            </Button>

                            {/* Mobile filter trigger */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex lg:hidden gap-2"
                                    >
                                        <SlidersHorizontal className="size-4" />
                                        Filtros
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="left"
                                    className="w-80 overflow-y-auto"
                                >
                                    <SheetHeader className="mb-4">
                                        <SheetTitle>Filtros</SheetTitle>
                                    </SheetHeader>
                                    <FilterPanel />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Body */}
            <Container className="py-10">
                <div className="flex gap-8 items-start">
                    {/* Sidebar — desktop only */}
                    <div className="hidden lg:block w-64 shrink-0 sticky top-6">
                        <FilterPanel />
                    </div>

                    {/* Service grid */}
                    <div className="flex-1 min-w-0">
                        {loading ? (
                            <Loading />
                        ) : services.services.length === 0 ? (
                            <Empty className="w-full mt-10">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <MapPin className="size-6 text-muted-foreground" />
                                    </EmptyMedia>
                                    <EmptyTitle>
                                        Nenhum serviço encontrado
                                    </EmptyTitle>
                                    <EmptyDescription>
                                        Não há serviços disponíveis no momento.
                                        Tente novamente mais tarde.
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent />
                            </Empty>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {services.services.map((service) => (
                                    <ServiceCard
                                        key={service.id}
                                        service={service}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <PaginationDemo
                    page={currentPage}
                    total={services.total}
                    onPageChange={setCurrentPage}
                />
            </Container>
        </div>
    );
};
