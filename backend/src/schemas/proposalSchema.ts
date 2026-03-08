import z from "zod";

export const createProposalSchema = z.object({
    message: z
        .string()
        .min(10, "A mensagem deve ter pelo menos 10 caracteres")
        .max(1000, "A mensagem deve ter no máximo 1000 caracteres"),
    price: z.coerce.number().positive("O valor deve ser maior que zero"),
});

export const updateProposalSchema = z.object({
    message: z
        .string()
        .min(10, "A mensagem deve ter pelo menos 10 caracteres")
        .max(1000, "A mensagem deve ter no máximo 1000 caracteres")
        .optional(),
    status: z
        .enum(["PENDING", "ACCEPTED", "REJECTED"], {
            error: () => ({ message: "Status inválido" }),
        })
        .optional(),
});
