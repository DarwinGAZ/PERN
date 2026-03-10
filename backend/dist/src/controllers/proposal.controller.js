import { acceptProposalService, createProposalService, deleteProposalService, getAllProposalService, getMyProposalsService, getProposalByServiceIdService, getProposalsInServiceIdService, rejectProposalService, updateProposalService, } from "../services/proposalService.js";
import { createProposalSchema, updateProposalSchema, } from "../schemas/proposalSchema.js";
import { getServiceByIdService } from "../services/serviceService.js";
export const createProposal = async (req, res) => {
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
    const existingService = await getServiceByIdService(serviceId);
    if (!existingService) {
        return res.status(404).json({ error: "Serviço não encontrado" });
    }
    if (existingService.ownerId === applicantId) {
        return res.status(400).json({
            error: "Você não pode criar uma proposta para o seu próprio serviço",
        });
    }
    const existingProposal = await getProposalByServiceIdService(serviceId, applicantId);
    if (existingProposal) {
        return res
            .status(400)
            .json({ error: "Você já criou uma proposta para esse serviço" });
    }
    const newProposal = await createProposalService(data.data.message, data.data.price, applicantId, serviceId);
    return res.status(201).json(newProposal);
};
export const getProposalsInServices = async (req, res) => {
    const { serviceId } = req.params;
    const service = await getServiceByIdService(serviceId);
    if (!service) {
        return res.status(404).json({ error: "Serviço não encontrado" });
    }
    if (service.ownerId !== req.userId) {
        return res.status(403).json({
            error: "Você não tem permissão para visualizar as propostas deste serviço",
        });
    }
    const proposals = await getProposalsInServiceIdService(serviceId);
    return res.status(200).json(proposals);
};
export const getAllProposal = async (req, res) => {
    const proposals = await getAllProposalService();
    if (!proposals || proposals.length === 0) {
        return res.status(204).json({ message: "Nenhuma proposta encontrada" });
    }
    return res.status(200).json(proposals);
};
export const deleteProposal = async (req, res) => {
    const { id } = req.params;
    const deletedProposal = await deleteProposalService(id);
    return res.status(200).json(deletedProposal);
};
export const updateProposal = async (req, res) => {
    const data = await updateProposalSchema.safeParse(req.body);
    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Id da proposta não informado" });
    }
    const updatedProposal = await updateProposalService(id, {
        ...(data.data.message && { message: data.data.message }),
        ...(data.data.status && { status: data.data.status }),
    });
    return res.status(200).json(updatedProposal);
};
export const getMyProposals = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Não autorizado" });
    }
    const applicantId = req.userId;
    const proposals = await getMyProposalsService(applicantId);
    if (!proposals || proposals.length === 0) {
        return res.status(204).json({ message: "Nenhuma proposta encontrada" });
    }
    return res.status(200).json(proposals);
};
export const acceptProposal = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ error: "Não autorizado" });
    if (!id) {
        return res.status(400).json({ error: "Id da proposta não informado" });
    }
    const updatedProposal = await acceptProposalService(id, userId);
    if (!updatedProposal) {
        return res.status(404).json({ error: "Proposta não encontrada" });
    }
    return res.status(200).json(updatedProposal);
};
export const rejectProposal = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ error: "Não autorizado" });
    if (!id) {
        return res.status(400).json({ error: "Id da proposta não informado" });
    }
    const updatedProposal = await rejectProposalService(id, userId);
    if (!updatedProposal) {
        return res.status(404).json({ error: "Proposta não encontrada" });
    }
    return res.status(200).json(updatedProposal);
};
//# sourceMappingURL=proposal.controller.js.map