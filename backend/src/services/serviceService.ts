import { Prisma } from "../generated/prisma/client";
import prisma from "../libs/prisma";

export const createServiceService = async (
    title: string,
    description: string,
    price: number,
    location: string,
    ownerId: string,
) => {
    const newService = await prisma.service.create({
        data: { title, description, price, location, ownerId },
    });

    return newService;
};

export const getServiceByIdService = async (serviceId: string) => {
    const service = await prisma.service.findUnique({
        where: {
            id: serviceId,
        },
    });
    return service;
};

export const getAllServicesService = async () => {
    const services = await prisma.service.findMany();

    return services;
};

export const getMyServicesService = async (ownerId: string) => {
    const services = await prisma.service.findMany({
        where: {
            ownerId,
        },
    });

    return services;
};

export const deleteServicesService = async (serviceId: string) => {
    const deletedService = await prisma.service.delete({
        where: {
            id: serviceId,
        },
    });

    return deletedService;
};

export const updateServiceService = async (
    serviceId: string,
    data: Prisma.ServiceUpdateInput,
) => {
    const updateService = prisma.service.update({
        where: {
            id: serviceId,
        },
        data,
    });

    return updateService;
};
