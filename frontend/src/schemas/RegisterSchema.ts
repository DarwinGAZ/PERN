import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres"),

    email: z.string().email("Digite um email válido"),

    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
