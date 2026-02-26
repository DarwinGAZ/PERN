import z from "zod";

export const createServiceSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(1000),
    price: z.coerce.number().positive(),
    location: z.string().min(2).max(100),
    ownerId: z.string().uuid(),
});

export const updateServiceSchema = z.object({
    title: z.string().min(3).max(100).optional(),
    description: z.string().min(10).max(1000).optional(),
    price: z.coerce.number().positive().optional(),
    location: z.string().min(2).max(100).optional(),
});
