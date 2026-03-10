export const statusConfig = {
    OPEN: {
        label: "Aberto",
        className: "text-white border-green-200 bg-green-600",
    },
    IN_PROGRESS: {
        label: "Em Progresso",
        className: "text-white border-yellow-200 bg-yellow-600",
    },
    COMPLETED: {
        label: "Concluído",
        className: "text-white border-blue-200 bg-blue-600",
    },
} as const;
