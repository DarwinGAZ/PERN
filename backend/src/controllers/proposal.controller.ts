import { Response } from "express";
import { AuthRequest } from "../types/AuthType";
import {
    acceptProposalService,
    createProposalService,
    deleteProposalService,
    getAllProposalService,
    getMyProposalsService,
    getProposalByServiceIdService,
    getProposalsInServiceIdService,
    rejectProposalService,
    updateProposalService,
} from "../services/proposalService";
import {
    createProposalSchema,
    updateProposalSchema,
} from "../schemas/proposalSchema";
import { getServiceByIdService } from "../services/serviceService";
import cookieParser from "cookie-parser";

export const createProposal = async (req: AuthRequest, res: Response) => {
    const data = await createProposalSchema.safeParse(req.body);
    if (!data.success) {
        return res
            .status(400)
            .json({ error: data.error.flatten().fieldErrors });
    }

    const applicantId = req.userId;

    if (!applicantId) {
        return res.status(401).json({ error: "Não autorizado" });
    }

    const serviceId = req.params.serviceId;

    if (!serviceId) {
        return res.status(400).json({ error: "Id do Serviço não informado" });
    }

    const existingService = await getServiceByIdService(serviceId as string);

    if (!existingService) {
        return res.status(404).json({ error: "Serviço não encontrado" });
    }

    if (existingService.ownerId === applicantId) {
        return res.status(400).json({
            error: "Você não pode criar uma proposta para o seu próprio serviço",
        });
    }

    const existingProposal = await getProposalByServiceIdService(
        serviceId as string,
        applicantId,
    );

    if (existingProposal) {
        return res
            .status(400)
            .json({ error: "Você já criou uma proposta para esse serviço" });
    }

    const newProposal = await createProposalService(
        data.data.message,
        data.data.price,
        applicantId,
        serviceId as string,
    );

    return res.status(201).json(newProposal);
};

export const getProposalsInServices = async (
    req: AuthRequest,
    res: Response,
) => {
    const { serviceId } = req.params;

    const service = await getServiceByIdService(serviceId as string);

    if (!service) {
        return res.status(404).json({ error: "Serviço não encontrado" });
    }

    if (service.ownerId !== req.userId) {
        return res.status(403).json({
            error: "Você não tem permissão para visualizar as propostas deste serviço",
        });
    }

    const proposals = await getProposalsInServiceIdService(serviceId as string);

    return res.status(200).json(proposals);
};

export const getAllProposal = async (req: AuthRequest, res: Response) => {
    const proposals = await getAllProposalService();

    if (!proposals || proposals.length === 0) {
        return res.status(204).json({ message: "Nenhuma proposta encontrada" });
    }

    return res.status(200).json(proposals);
};

export const deleteProposal = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const deletedProposal = await deleteProposalService(id as string);

    return res.status(200).json(deletedProposal);
};

export const updateProposal = async (req: AuthRequest, res: Response) => {
    const data = await updateProposalSchema.safeParse(req.body);
    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Id da proposta não informado" });
    }

    const updatedProposal = await updateProposalService(id as string, {
        ...(data.data.message && { message: data.data.message }),
        ...(data.data.status && { status: data.data.status }),
    });
    return res.status(200).json(updatedProposal);
};

export const getMyProposals = async (req: AuthRequest, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Não autorizado" });
    }

    const applicantId = req.userId;

    const proposals = await getMyProposalsService(applicantId as string);

    if (!proposals || proposals.length === 0) {
        return res.status(204).json({ message: "Nenhuma proposta encontrada" });
    }

    return res.status(200).json(proposals);
};

export const acceptProposal = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ error: "Não autorizado" });

    if (!id) {
        return res.status(400).json({ error: "Id da proposta não informado" });
    }

    const updatedProposal = await acceptProposalService(id as string, userId);

    if (!updatedProposal) {
        return res.status(404).json({ error: "Proposta não encontrada" });
    }

    return res.status(200).json(updatedProposal);
};

export const rejectProposal = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ error: "Não autorizado" });

    if (!id) {
        return res.status(400).json({ error: "Id da proposta não informado" });
    }

    const updatedProposal = await rejectProposalService(id as string, userId);

    if (!updatedProposal) {
        return res.status(404).json({ error: "Proposta não encontrada" });
    }

    return res.status(200).json(updatedProposal);
};
