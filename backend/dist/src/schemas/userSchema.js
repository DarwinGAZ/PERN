import * as z from "zod";
export const createUserSchema = z.object({
    name: z.string().min(2),
    email: z.email("Email Inválido"),
    password: z.string().min(6, "A senha precisa ter no minimo 6 caracteres"),
});
export const loginUserSchema = z.object({
    email: z.email("Email Inválido"),
    password: z.string().min(6),
});
export const updateUserSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.email("Email Inválido").optional(),
    password: z
        .string()
        .min(6, "A senha precisa ter no minimo 6 caracteres")
        .optional(),
});
export const updateUserRoleSchema = z.object({
    role: z.enum(["ADMIN", "USER"]),
});
//# sourceMappingURL=userSchema.js.map