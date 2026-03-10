import prisma from "../libs/prisma.js";
export const createProposalService = async (message, price, applicantId, serviceId) => {
    const newProposal = await prisma.proposal.create({
        data: {
            message,
            price,
            applicantId,
            serviceId,
        },
    });
    return newProposal;
};
export const getProposalByServiceIdService = async (serviceId, applicantId) => {
    const proposal = await prisma.proposal.findFirst({
        where: {
            serviceId,
            applicantId,
        },
    });
    return proposal;
};
export const getProposalsInServiceIdService = async (serviceId) => {
    const proposals = await prisma.proposal.findMany({
        where: {
            serviceId,
        },
        include: {
            applicant: {
                select: { id: true, name: true, email: true },
            },
        },
    });
    return proposals;
};
export const getAllProposalService = async () => {
    const proposals = await prisma.proposal.findMany({});
    return proposals;
};
export const deleteProposalService = async (proposalId) => {
    const deletedProposal = await prisma.proposal.delete({
        where: {
            id: proposalId,
        },
    });
    return deletedProposal;
};
export const updateProposalService = async (id, data) => {
    const updatedProposal = await prisma.proposal.update({
        where: {
            id,
        },
        data,
    });
    return updatedProposal;
};
export const getMyProposalsService = async (applicantId) => {
    const proposals = await prisma.proposal.findMany({
        where: { applicantId },
        include: {
            service: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    price: true,
                    location: true,
                },
            },
        },
    });
    return proposals;
};
export const acceptProposalService = async (proposalId, userId) => {
    const proposal = await prisma.proposal.findUnique({
        where: { id: proposalId },
        include: { service: true },
    });
    if (!proposal)
        throw new Error("Proposta não encontrada");
    if (proposal.service.ownerId !== userId)
        throw new Error("Sem permissão");
    if (proposal.status !== "PENDING")
        throw new Error("Proposta já foi processada");
    await prisma.$transaction([
        prisma.proposal.update({
            where: { id: proposalId },
            data: { status: "ACCEPTED" },
        }),
        prisma.proposal.updateMany({
            where: { serviceId: proposal.serviceId, id: { not: proposalId } },
            data: { status: "REJECTED" },
        }),
        prisma.service.update({
            where: { id: proposal.serviceId },
            data: { status: "IN_PROGRESS" },
        }),
    ]);
    return { message: "Proposta aceita com sucesso", proposal };
};
export const rejectProposalService = async (proposalId, userId) => {
    const proposal = await prisma.proposal.findUnique({
        where: { id: proposalId },
        include: { service: true },
    });
    if (!proposal)
        throw new Error("Proposta não encontrada");
    if (proposal.service.ownerId !== userId)
        throw new Error("Sem permissão");
    if (proposal.status !== "PENDING")
        throw new Error("Proposta já foi processada");
    return await prisma.proposal.update({
        where: { id: proposalId },
        data: { status: "REJECTED" },
    });
};
//# sourceMappingURL=proposalService.js.map