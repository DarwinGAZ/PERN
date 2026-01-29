import * as z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2),
    email: z.email("Email Inválido"),
    password: z.string().min(6, "A senha precisa ter no minimo 6 caracteres"),
});
