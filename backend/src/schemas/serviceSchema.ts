import z from "zod";

export const createServiceSchema = z.object({
    title: z
        .string()
        .min(3, "O título deve ter pelo menos 3 caracteres")
        .max(100, "O título deve ter no máximo 100 caracteres"),
    description: z
        .string()
        .min(10, "A descrição deve ter pelo menos 10 caracteres")
        .max(1000, "A descrição deve ter no máximo 1000 caracteres"),
    price: z.coerce.number().positive("O valor deve ser maior que zero"),
    location: z
        .string()
        .min(2, "A localização deve ter pelo menos 2 caracteres")
        .max(100, "A localização deve ter no máximo 100 caracteres"),
});

export const updateServiceSchema = z.object({
    title: z
        .string()
        .min(3, "O título deve ter pelo menos 3 caracteres")
        .max(100, "O título deve ter no máximo 100 caracteres")
        .optional(),
    description: z
        .string()
        .min(10, "A descrição deve ter pelo menos 10 caracteres")
        .max(1000, "A descrição deve ter no máximo 1000 caracteres")
        .optional(),
    price: z.coerce
        .number()
        .positive("O valor deve ser maior que zero")
        .optional(),
    location: z
        .string()
        .min(2, "A localização deve ter pelo menos 2 caracteres")
        .max(100, "A localização deve ter no máximo 100 caracteres")
        .optional(),
    status: z
        .enum(["OPEN", "IN_PROGRESS", "COMPLETED"], {
            error: () => ({ message: "Status inválido" }),
        })
        .optional(),
});
