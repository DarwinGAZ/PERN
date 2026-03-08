export const statusConfig = {
    OPEN: {
        label: "Aberto",
        className: "text-green-600 border-green-200 bg-green-50",
    },
    IN_PROGRESS: {
        label: "Em Progresso",
        className: "text-yellow-600 border-yellow-200 bg-yellow-50",
    },
    COMPLETED: {
        label: "Concluído",
        className: "text-blue-600 border-blue-200 bg-blue-50",
    },
} as const;
