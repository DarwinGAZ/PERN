import prisma from "../libs/prisma.js";
export const createServiceService = async (title, description, price, location, ownerId) => {
    const newService = await prisma.service.create({
        data: { title, description, price, location, ownerId },
    });
    return newService;
};
export const getServiceByIdService = async (serviceId) => {
    const service = await prisma.service.findUnique({
        where: {
            id: serviceId,
        },
    });
    return service;
};
export const getAllServicesService = async (page = 1) => {
    let skip = (page - 1) * 12;
    const [services, total] = await prisma.$transaction([
        prisma.service.findMany({ take: 12, skip }),
        prisma.service.count(),
    ]);
    return { services, page, total };
};
export const getMyServicesService = async (ownerId) => {
    const services = await prisma.service.findMany({
        where: {
            ownerId,
        },
    });
    return services;
};
export const deleteServicesService = async (serviceId) => {
    await prisma.proposal.deleteMany({
        where: { serviceId },
    });
    const deletedService = await prisma.service.delete({
        where: { id: serviceId },
    });
    return deletedService;
};
export const updateServiceService = async (serviceId, data) => {
    const updateService = prisma.service.update({
        where: {
            id: serviceId,
        },
        data,
    });
    return updateService;
};
export const getLocationsOnServicesService = async () => {
    const locations = await prisma.service.findMany({
        select: {
            location: true,
        },
    });
    return locations.map((loc) => loc.location);
};
//# sourceMappingURL=serviceService.js.map