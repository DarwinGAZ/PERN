import { Prisma } from "../generated/prisma/client";
import prisma from "../libs/prisma";

export const createProposalService = async (
    message: string,
    applicantId: string,
    serviceId: string,
) => {
    const newProposal = await prisma.proposal.create({
        data: {
            message,
            applicantId,
            serviceId,
        },
    });

    return newProposal;
};

export const getProposalByServiceIdService = async (
    serviceId: string,
    applicantId: string,
) => {
    const proposal = await prisma.proposal.findFirst({
        where: {
            serviceId,
            applicantId,
        },
    });

    return proposal;
};

export const getProposalsInServiceIdService = async (serviceId: string) => {
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

export const deleteProposalService = async (proposalId: string) => {
    const deletedProposal = await prisma.proposal.delete({
        where: {
            id: proposalId,
        },
    });

    return deletedProposal;
};

export const updateProposalService = async (
    id: string,
    data: Prisma.ProposalUpdateInput,
) => {
    const updatedProposal = await prisma.proposal.update({
        where: {
            id,
        },
        data,
    });

    return updatedProposal;
};
