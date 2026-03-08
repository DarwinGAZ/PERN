export const ProposalConfig = {
    PENDING: {
        label: "Pendente",
        className: "text-gray-600 border-gray-200 bg-gray-50",
    },
    ACCEPTED: {
        label: "Aceito",
        className: "text-green-600 border-green-200 bg-green-50",
    },
    REJECTED: {
        label: "Recusado",
        className: "text-red-600 border-red-200 bg-red-50",
    },
} as const;
