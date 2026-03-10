export const ProposalConfig = {
    PENDING: {
        label: "Pendente",
        className: "text-gray-600 border-gray-200 bg-gray-50",
    },
    ACCEPTED: {
        label: "Aceito",
        className: "text-white border-green-200 bg-green-600",
    },
    REJECTED: {
        label: "Recusado",
        className: "text-white border-red-200 bg-red-600",
    },
} as const;
