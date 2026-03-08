import { Button } from "@/components/ui/button";

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                <h2 className="mb-6 text-7xl font-semibold">404</h2>
                <h3 className="mb-1.5 text-3xl font-semibold">
                    Página não encontrada
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                    A página que você está procurando não existe ou foi movida.
                </p>
                <Button asChild size="lg" className="rounded-lg text-base">
                    <a href="/">Voltar para a página inicial</a>
                </Button>
            </div>
        </div>
    );
}

export default NotFound;
