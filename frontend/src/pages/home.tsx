import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Briefcase,
    Search,
    MessageCircle,
    ShieldCheck,
    Star,
    Zap,
    Users,
    TrendingUp,
    ArrowRight,
    CheckCircle2,
    Wrench,
    Palette,
    Code2,
    Camera,
    Truck,
    BookOpen,
} from "lucide-react";

const categories = [
    { icon: Code2, label: "Tecnologia", count: "1.2k serviços" },
    { icon: Palette, label: "Design", count: "890 serviços" },
    { icon: Wrench, label: "Reparos", count: "2.3k serviços" },
    { icon: Camera, label: "Fotografia", count: "640 serviços" },
    { icon: Truck, label: "Entregas", count: "1.8k serviços" },
    { icon: BookOpen, label: "Aulas", count: "970 serviços" },
];

const steps = [
    {
        number: "01",
        title: "Publique ou encontre",
        description:
            "Cadastre seu serviço em minutos ou busque o profissional ideal para sua necessidade.",
        icon: Search,
    },
    {
        number: "02",
        title: "Conecte-se",
        description:
            "Troque mensagens, negocie valores e combine os detalhes diretamente pelo chat.",
        icon: MessageCircle,
    },
    {
        number: "03",
        title: "Feche e avalie",
        description:
            "Contrate com segurança e deixe sua avaliação para fortalecer a comunidade.",
        icon: CheckCircle2,
    },
];

const stats = [
    { value: "18k+", label: "Prestadores ativos", icon: Users },
    { value: "54k+", label: "Serviços realizados", icon: Briefcase },
    { value: "4.8", label: "Avaliação média", icon: Star },
    { value: "98%", label: "Satisfação geral", icon: TrendingUp },
];

const testimonials = [
    {
        name: "Ana Souza",
        role: "Designer freelancer",
        text: "Triplicou minha carteira de clientes em dois meses. A plataforma é intuitiva e os clientes chegam até mim.",
        rating: 5,
    },
    {
        name: "Carlos Mendes",
        role: "Empresário",
        text: "Encontrei um eletricista qualificado em menos de 30 minutos. Processo rápido e sem dor de cabeça.",
        rating: 5,
    },
    {
        name: "Priya Lima",
        role: "Professora particular",
        text: "Gerencio tudo pelo app: agenda, pagamentos, avaliações. É como ter uma secretária virtual.",
        rating: 5,
    },
];

export default function Home() {
    const navigate = useNavigate();

    return (
        <div>
            {/* ── HERO ── */}
            <section className="relative overflow-hidden border-b">
                {/* background decoration */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto px-4 py-24 md:py-36 flex flex-col items-center text-center gap-6">
                    <Badge
                        variant="outline"
                        className="gap-1.5 px-3 py-1 text-xs font-medium"
                    >
                        <Zap className="size-3 text-primary" />A plataforma que
                        conecta talentos a oportunidades
                    </Badge>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl">
                        O serviço certo,{" "}
                        <span className="text-primary">no momento certo</span>
                    </h1>

                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
                        O{" "}
                        <strong className="text-foreground">ConectaPro</strong>{" "}
                        é o marketplace que une quem precisa de serviços a
                        profissionais verificados — rápido, seguro e sem
                        complicação.
                    </p>

                    <div className="flex flex-wrap gap-3 justify-center mt-2">
                        <Button
                            size="lg"
                            className="gap-2 px-8 text-base h-12"
                            onClick={() => navigate("/services")}
                        >
                            <Search className="size-4" />
                            Encontrar serviços
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 px-8 text-base h-12"
                            onClick={() => navigate("/register")}
                        >
                            <Briefcase className="size-4" />
                            Oferecer serviço
                        </Button>
                    </div>

                    {/* mini social proof */}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-4">
                        <div className="flex -space-x-2">
                            {[
                                "bg-orange-400",
                                "bg-sky-400",
                                "bg-emerald-400",
                                "bg-violet-400",
                            ].map((c, i) => (
                                <div
                                    key={i}
                                    className={`size-7 rounded-full border-2 border-background ${c}`}
                                />
                            ))}
                        </div>
                        <span>
                            <strong className="text-foreground">+18.000</strong>{" "}
                            profissionais prontos para te atender
                        </span>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="border-b bg-muted/30">
                <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map(({ value, label, icon: Icon }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center text-center gap-2"
                        >
                            <div className="p-2.5 rounded-xl bg-primary/10">
                                <Icon className="size-5 text-primary" />
                            </div>
                            <span className="text-3xl font-extrabold tracking-tight">
                                {value}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── COMO FUNCIONA ── */}
            <section id="como-funciona" className="border-b">
                <div className="max-w-6xl mx-auto px-4 py-20 space-y-12">
                    <div className="text-center space-y-3">
                        <Badge variant="secondary">Como funciona</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Simples do início ao fim
                        </h2>
                        <p className="text-muted-foreground max-w-lg mx-auto">
                            Três passos para contratar ou começar a vender seus
                            serviços.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 relative">
                        {/* linha conectora */}
                        <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-border" />

                        {steps.map(
                            ({ number, title, description, icon: Icon }) => (
                                <Card
                                    key={number}
                                    className="relative border bg-background shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <CardContent className="pt-6 pb-6 flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                                <Icon className="size-5 text-primary" />
                                            </div>
                                            <span className="text-3xl font-black text-muted-foreground/20 leading-none">
                                                {number}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-base mb-1">
                                                {title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* ── CATEGORIAS ── */}
            <section id="categorias" className="border-b bg-muted/20">
                <div className="max-w-6xl mx-auto px-4 py-20 space-y-12">
                    <div className="text-center space-y-3">
                        <Badge variant="secondary">Categorias</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Encontre o profissional ideal
                        </h2>
                        <p className="text-muted-foreground max-w-lg mx-auto">
                            Milhares de serviços organizados para você encontrar
                            exatamente o que precisa.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {categories.map(({ icon: Icon, label, count }) => (
                            <button
                                key={label}
                                onClick={() => navigate("/services")}
                                className="group flex flex-col items-center gap-3 p-5 rounded-xl border bg-background hover:border-primary hover:shadow-md transition-all"
                            >
                                <div className="size-11 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-semibold">
                                        {label}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {count}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => navigate("/services")}
                        >
                            Ver todas as categorias
                            <ArrowRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* ── POR QUE CONECTAPRO ── */}
            <section className="border-b">
                <div className="max-w-6xl mx-auto px-4 py-20">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <Badge variant="secondary">
                                Por que ConectaPro?
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug">
                                Segurança e confiança em cada contratação
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Cada prestador passa por verificação de
                                identidade e tem seu histórico de avaliações
                                público. Você contrata sabendo exatamente com
                                quem está lidando.
                            </p>

                            <div className="space-y-3">
                                {[
                                    {
                                        icon: ShieldCheck,
                                        text: "Prestadores verificados com avaliações reais",
                                    },
                                    {
                                        icon: MessageCircle,
                                        text: "Chat direto sem intermediários",
                                    },
                                    {
                                        icon: Star,
                                        text: "Sistema de avaliações transparente",
                                    },
                                    {
                                        icon: Zap,
                                        text: "Respostas rápidas — média de 15 minutos",
                                    },
                                ].map(({ icon: Icon, text }) => (
                                    <div
                                        key={text}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Icon className="size-4 text-primary" />
                                        </div>
                                        <span className="text-sm">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* visual card mock */}
                        <div className="relative flex justify-center">
                            <div className="w-full max-w-sm space-y-3">
                                {[
                                    {
                                        name: "João Silva",
                                        role: "Eletricista",
                                        rating: "4.9",
                                        jobs: "312 serviços",
                                        color: "bg-amber-400",
                                    },
                                    {
                                        name: "Mariana Costa",
                                        role: "Desenvolvedora",
                                        rating: "5.0",
                                        jobs: "87 serviços",
                                        color: "bg-sky-400",
                                    },
                                    {
                                        name: "Rafael Nunes",
                                        role: "Designer UI",
                                        rating: "4.8",
                                        jobs: "204 serviços",
                                        color: "bg-emerald-400",
                                    },
                                ].map((p) => (
                                    <Card key={p.name} className="shadow-sm">
                                        <CardContent className="py-3 px-4 flex items-center gap-3">
                                            <div
                                                className={`size-10 rounded-full ${p.color} shrink-0 flex items-center justify-center font-bold text-white text-sm`}
                                            >
                                                {p.name[0]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm">
                                                    {p.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {p.role} · {p.jobs}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1 shrink-0">
                                                <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-semibold">
                                                    {p.rating}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                <div className="text-center pt-1">
                                    <span className="text-xs text-muted-foreground">
                                        +18.000 profissionais cadastrados
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DEPOIMENTOS ── */}
            <section id="depoimentos" className="border-b bg-muted/20">
                <div className="max-w-6xl mx-auto px-4 py-20 space-y-12">
                    <div className="text-center space-y-3">
                        <Badge variant="secondary">Depoimentos</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Quem usa, recomenda
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map(({ name, role, text, rating }) => (
                            <Card
                                key={name}
                                className="bg-background shadow-sm"
                            >
                                <CardContent className="pt-6 pb-6 space-y-4">
                                    <div className="flex gap-0.5">
                                        {Array.from({ length: rating }).map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    className="size-4 fill-yellow-400 text-yellow-400"
                                                />
                                            ),
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        "{text}"
                                    </p>
                                    <Separator />
                                    <div>
                                        <p className="font-semibold text-sm">
                                            {name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {role}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ── */}
            <section className="border-b">
                <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
                    <Badge variant="outline" className="gap-1.5">
                        <Zap className="size-3 text-primary" />
                        Comece gratuitamente
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                        Pronto para se{" "}
                        <span className="text-primary">conectar</span>?
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Cadastre-se agora e encontre o serviço que precisa — ou
                        comece a vender suas habilidades hoje mesmo.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Button
                            size="lg"
                            className="gap-2 px-8 h-12 text-base"
                            onClick={() => navigate("/register")}
                        >
                            Criar conta grátis
                            <ArrowRight className="size-4" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 px-8 h-12 text-base"
                            onClick={() => navigate("/services")}
                        >
                            <Search className="size-4" />
                            Explorar serviços
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
