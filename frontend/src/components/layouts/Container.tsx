interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    bgClassName?: string; // background no wrapper externo
}

export function Container({ children, className }: ContainerProps) {
    return (
        // Wrapper ocupa 100% da tela com o background correto            {/* Conteúdo limitado a 1280px, centralizado */}
        <div className={`max-w-[1280px] mx-auto px-6 ${className || ""}`}>
            {children}
        </div>
    );
}
