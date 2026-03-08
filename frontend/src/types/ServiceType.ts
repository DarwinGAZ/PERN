export type Service = {
    id: string;
    title: string;
    description: string;
    price: string;
    location: string;
    status: ServiceStatus;
    ownerId: string;
};

export type ServiceWithPage = {
    services: Service[];
    page: number;
    total: number;
};

export type ServiceStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";
