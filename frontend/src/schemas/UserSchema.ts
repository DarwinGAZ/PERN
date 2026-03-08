import z from "zod";

export const updateUserSchema = z.object({
    name: z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .max(50, "O nome deve ter no máximo 50 caracteres")
        .optional(),
    email: z.string().email("Email inválido").optional(),
});
