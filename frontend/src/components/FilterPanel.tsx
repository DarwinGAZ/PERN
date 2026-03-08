import { MapPin, Search, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useEffect, useState, useCallback } from "react";
import { Badge } from "./ui/badge";
import api from "@/services/axios";

const categories = [
    "Design",
    "Tecnologia",
    "Marketing",
    "Consultoria",
    "Educação",
    "Saúde",
];

interface FilterState {
    search: string;
    categories: string[];
    locations: string[];
    priceRange: [number, number];
}

interface FilterPanelProps {
    onFilterChange?: (filters: FilterState) => void;
}

const PRICE_MIN = 0;
const PRICE_MAX = 1000;

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        categories: [],
        locations: [],
        priceRange: [PRICE_MIN, PRICE_MAX],
    });
    const [locations, setLocations] = useState<string[]>([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await api.get("/services/locations");
                setLocations(response.data);
            } catch (error) {
                console.error("Erro ao buscar localizações:", error);
            }
        };
        fetchLocations();
    }, []);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters((prev) => ({ ...prev, search: searchInput }));
        }, 400);
        return () => clearTimeout(timer);
    }, [searchInput]);

    useEffect(() => {
        onFilterChange?.(filters);
    }, [filters, onFilterChange]);

    const toggleCategory = useCallback((cat: string) => {
        setFilters((prev) => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter((c) => c !== cat)
                : [...prev.categories, cat],
        }));
    }, []);

    const toggleLocation = useCallback((loc: string) => {
        setFilters((prev) => ({
            ...prev,
            locations: prev.locations.includes(loc)
                ? prev.locations.filter((l) => l !== loc)
                : [...prev.locations, loc],
        }));
    }, []);

    const clearAll = () => {
        setSearchInput("");
        setFilters({
            search: "",
            categories: [],
            locations: [],
            priceRange: [PRICE_MIN, PRICE_MAX],
        });
    };

    const activeFilterCount =
        filters.categories.length +
        filters.locations.length +
        (filters.priceRange[0] > PRICE_MIN || filters.priceRange[1] < PRICE_MAX
            ? 1
            : 0);

    const hasFilters = activeFilterCount > 0 || filters.search !== "";

    return (
        <aside className="w-full flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                    placeholder="Buscar serviços..."
                    className="pl-9 bg-background"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                {searchInput && (
                    <button
                        onClick={() => setSearchInput("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="size-3.5" />
                    </button>
                )}
            </div>

            {/* Filter card */}
            <Card className="overflow-hidden">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="size-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">Filtros</span>
                        {activeFilterCount > 0 && (
                            <Badge className="h-5 px-1.5 text-xs rounded-full">
                                {activeFilterCount}
                            </Badge>
                        )}
                    </div>
                    {hasFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                            onClick={clearAll}
                        >
                            <RotateCcw className="size-3 mr-1" />
                            Limpar
                        </Button>
                    )}
                </CardHeader>

                <Separator />

                <CardContent className="p-0">
                    <Accordion
                        type="multiple"
                        defaultValue={["category", "price", "location"]}
                        className="w-full"
                    >
                        {/* Category */}
                        <AccordionItem
                            value="category"
                            className="border-b px-4"
                        >
                            <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">
                                <span className="flex items-center gap-2">
                                    Categoria
                                    {filters.categories.length > 0 && (
                                        <Badge
                                            variant="secondary"
                                            className="h-4 px-1.5 text-xs rounded-full font-normal"
                                        >
                                            {filters.categories.length}
                                        </Badge>
                                    )}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                <div className="flex flex-col gap-2.5">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat}
                                            className="flex items-center gap-2"
                                        >
                                            <Checkbox
                                                id={`cat-${cat}`}
                                                checked={filters.categories.includes(
                                                    cat,
                                                )}
                                                onCheckedChange={() =>
                                                    toggleCategory(cat)
                                                }
                                            />
                                            <Label
                                                htmlFor={`cat-${cat}`}
                                                className="text-sm font-normal cursor-pointer flex-1"
                                            >
                                                {cat}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Price range */}
                        <AccordionItem value="price" className="border-b px-4">
                            <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">
                                <span className="flex items-center gap-2">
                                    Faixa de Preço
                                    {(filters.priceRange[0] > PRICE_MIN ||
                                        filters.priceRange[1] < PRICE_MAX) && (
                                        <Badge
                                            variant="secondary"
                                            className="h-4 px-1.5 text-xs rounded-full font-normal"
                                        >
                                            ativo
                                        </Badge>
                                    )}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="pb-5">
                                <Slider
                                    min={PRICE_MIN}
                                    max={PRICE_MAX}
                                    step={50}
                                    value={filters.priceRange}
                                    onValueChange={(v) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            priceRange: v as [number, number],
                                        }))
                                    }
                                    className="mb-3"
                                />
                                <div className="flex justify-between">
                                    <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded">
                                        R$ {filters.priceRange[0]}
                                    </span>
                                    <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded">
                                        R$ {filters.priceRange[1]}
                                    </span>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Location */}
                        <AccordionItem
                            value="location"
                            className="border-0 px-4"
                        >
                            <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">
                                <span className="flex items-center gap-2">
                                    Localização
                                    {filters.locations.length > 0 && (
                                        <Badge
                                            variant="secondary"
                                            className="h-4 px-1.5 text-xs rounded-full font-normal"
                                        >
                                            {filters.locations.length}
                                        </Badge>
                                    )}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                {locations.length === 0 ? (
                                    <p className="text-xs text-muted-foreground">
                                        Carregando localizações...
                                    </p>
                                ) : (
                                    <div className="flex flex-col gap-2.5">
                                        {locations.map((loc) => (
                                            <div
                                                key={loc}
                                                className="flex items-center gap-2"
                                            >
                                                <Checkbox
                                                    id={`loc-${loc}`}
                                                    checked={filters.locations.includes(
                                                        loc,
                                                    )}
                                                    onCheckedChange={() =>
                                                        toggleLocation(loc)
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`loc-${loc}`}
                                                    className="text-sm font-normal cursor-pointer flex-1 flex items-center gap-1.5"
                                                >
                                                    <MapPin className="size-3 text-muted-foreground shrink-0" />
                                                    {loc}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>

                <Separator />

                <CardFooter className="p-4 gap-2">
                    <Button className="w-full" size="sm">
                        Aplicar Filtros
                    </Button>
                </CardFooter>
            </Card>

            {/* Active filter badges */}
            {(filters.categories.length > 0 ||
                filters.locations.length > 0) && (
                <div className="flex flex-wrap gap-1.5">
                    {filters.categories.map((cat) => (
                        <Badge
                            key={cat}
                            variant="secondary"
                            className="cursor-pointer gap-1 pr-1.5 hover:bg-destructive/10 hover:text-destructive transition-colors"
                            onClick={() => toggleCategory(cat)}
                        >
                            {cat}
                            <X className="size-2.5" />
                        </Badge>
                    ))}
                    {filters.locations.map((loc) => (
                        <Badge
                            key={loc}
                            variant="outline"
                            className="cursor-pointer gap-1 pr-1.5 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                            onClick={() => toggleLocation(loc)}
                        >
                            <MapPin className="size-2.5" />
                            {loc}
                            <X className="size-2.5" />
                        </Badge>
                    ))}
                </div>
            )}
        </aside>
    );
};

export { FilterPanel };
export type { FilterState };
