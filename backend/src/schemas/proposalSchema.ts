import z from "zod";

export const createProposalSchema = z.object({
    message: z.string().min(10).max(1000),
});

export const updateProposalSchema = z.object({
    message: z.string().min(10).max(1000).optional(),
    status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),
});
