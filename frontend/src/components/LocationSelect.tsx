import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Estado {
    id: number;
    sigla: string;
    nome: string;
}

interface Municipio {
    id: number;
    nome: string;
}

interface Props {
    value?: string; // formato: "Cidade, UF"
    onChange: (value: string) => void;
}

export function LocationSelect({ value, onChange }: Props) {
    const [estados, setEstados] = useState<Estado[]>([]);
    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [ufSelecionada, setUfSelecionada] = useState<string>("");
    const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");

    // Preenche os selects caso já exista um valor (ex: modo edição)
    // Busca estados
    useEffect(() => {
        async function fetchEstados() {
            try {
                const res = await fetch(
                    "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome",
                );
                const data = await res.json();
                setEstados(data);
            } catch (error) {
                console.error("Erro ao buscar estados:", error);
            }
        }
        fetchEstados();
    }, []);

    // Busca municípios quando UF muda
    useEffect(() => {
        if (!ufSelecionada) return;
        setCidadeSelecionada("");

        async function fetchMunicipios() {
            try {
                const res = await fetch(
                    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelecionada}/municipios?orderBy=nome`,
                );
                const data = await res.json();
                setMunicipios(data);
            } catch (error) {
                console.error("Erro ao buscar municípios:", error);
            }
        }
        fetchMunicipios();
    }, [ufSelecionada]);

    const handleUfChange = (uf: string) => {
        setUfSelecionada(uf);
        onChange(""); // limpa o valor no form
    };

    const handleCidadeChange = (cidade: string) => {
        setCidadeSelecionada(cidade);
        onChange(`${cidade}, ${ufSelecionada}`);
    };

    return (
        <div className="flex gap-2">
            {/* Estado */}
            <Select value={ufSelecionada} onValueChange={handleUfChange}>
                <SelectTrigger className="w-28 shrink-0">
                    <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                    {estados.map((e) => (
                        <SelectItem key={e.id} value={e.sigla}>
                            {e.sigla}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Cidade */}
            <Select
                value={cidadeSelecionada}
                onValueChange={handleCidadeChange}
                disabled={!ufSelecionada}
            >
                <SelectTrigger className="flex-1">
                    <SelectValue
                        placeholder={
                            ufSelecionada
                                ? "Selecione a cidade"
                                : "Selecione o estado primeiro"
                        }
                    />
                </SelectTrigger>
                <SelectContent>
                    {municipios.map((m) => (
                        <SelectItem key={m.id} value={m.nome}>
                            {m.nome}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
