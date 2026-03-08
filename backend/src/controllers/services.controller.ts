import { RequestHandler, Response } from "express";
import { AuthRequest } from "../types/AuthType";
import {
    createServiceSchema,
    updateServiceSchema,
} from "../schemas/serviceSchema";
import {
    createServiceService,
    deleteServicesService,
    getAllServicesService,
    getLocationsOnServicesService,
    getMyServicesService,
    getServiceByIdService,
    updateServiceService,
} from "../services/serviceService";

export const createService = async (req: AuthRequest, res: Response) => {
    const data = await createServiceSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const { title, description, price, location } = data.data;
    const ownerId = req.userId;

    if (!ownerId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const newService = await createServiceService(
        title,
        description,
        price,
        location,
        ownerId,
    );
    res.status(201).json(newService);
};

export const getAllServices: RequestHandler = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const services = await getAllServicesService(page);

    if (!services || services.services.length === 0) {
        return res.status(204).json({ message: "Nenhum serviço encontrado" });
    }

    res.status(200).json(services);
};

export const getMyServices = async (req: AuthRequest, res: Response) => {
    const ownerId = req.userId;

    if (!ownerId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const services = await getMyServicesService(ownerId);

    if (!services || services.length === 0) {
        return res.status(204).json({ message: "Nenhum serviço encontrado" });
    }

    res.status(200).json(services);
};

export const deleteService = async (req: AuthRequest, res: Response) => {
    const serviceId = req.params.id;

    if (!serviceId) {
        return res.status(400).json({ error: "ID do serviço não fornecido" });
    }

    const service = await getServiceByIdService(serviceId as string);

    if (req.userId !== service?.ownerId) {
        return res.status(403).json({
            error: "Você não tem permissão para deletar este serviço",
        });
    }

    const deletedService = await deleteServicesService(serviceId as string);

    if (!deletedService) {
        return res.status(404).json({ error: "Serviço não encontrado" });
    }

    res.status(200).json({
        message: "Serviço deletado com sucesso",
        deletedService,
    });
};

export const getServiceById = async (req: AuthRequest, res: Response) => {
    const serviceId = req.params.id;
    const service = await getServiceByIdService(serviceId as string);

    if (!service) {
        return res.status(404).json({ error: "Serviço não encontrado" });
    }

    res.status(200).json(service);
};

export const updateService = async (req: AuthRequest, res: Response) => {
    const data = await updateServiceSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({ error: data.error.flatten().fieldErrors });
    }

    const { serviceId } = req.params;

    if (!serviceId) {
        return res.status(400).json({ error: "ID do serviço não fornecido" });
    }

    const service = await getServiceByIdService(serviceId as string);

    if (req.userId !== service?.ownerId) {
        return res.status(403).json({
            error: "Você não tem permissão para atualizar este serviço",
        });
    }

    const { title, description, price, location } = data.data;

    const updatedService = await updateServiceService(serviceId as string, {
        ...(title && { title }),
        ...(description && { description }),
        ...(price && { price }),
        ...(location && { location }),
    });

    res.status(200).json(updatedService);
};

export const getLocationsOnServices: RequestHandler = async (req, res) => {
    const locations = await getLocationsOnServicesService();
    res.status(200).json(locations);
};
