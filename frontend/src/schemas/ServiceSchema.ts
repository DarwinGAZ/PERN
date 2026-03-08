import z from "zod";

export const createServiceSchema = z.object({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    description: z
        .string()
        .min(10, "A descrição deve ter pelo menos 10 caracteres"),
    price: z.number().positive("O preço deve ser um número positivo"),
    location: z
        .string()
        .min(3, "A localização deve ter pelo menos 3 caracteres"),
});

export const updateServiceSchema = z.object({
    title: z
        .string()
        .min(3, "O título deve ter pelo menos 3 caracteres")
        .optional(),
    description: z
        .string()
        .min(10, "A descrição deve ter pelo menos 10 caracteres")
        .optional(),
    price: z
        .number()
        .positive("O preço deve ser um número positivo")
        .optional(),
    location: z
        .string()
        .min(3, "A localização deve ter pelo menos 3 caracteres")
        .optional(),
    status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]).optional(),
});
