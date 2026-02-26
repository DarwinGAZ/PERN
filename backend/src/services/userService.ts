import { Prisma, Role } from "../generated/prisma/client";
import {
    EnumRoleFieldRefInput,
    EnumRoleFieldUpdateOperationsInput,
} from "../generated/prisma/internal/prismaNamespace";
import { hashPassword } from "../libs/bcrypt";
import prisma from "../libs/prisma";

interface createUserInput {
    name: string;
    email: string;
    password: string;
}

export const getAllUsersService = async () => {
    const users = await prisma.user.findMany();

    return users;
};

export const createUserService = async (data: createUserInput) => {
    const passwordCrypt = await hashPassword(data.password);

    const newUser = await prisma.user.create({
        data: {
            email: data.email.toLowerCase(),
            name: data.name.toLowerCase(),
            password: passwordCrypt,
        },
    });

    return newUser;
};

export const getUserByEmailService = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
};

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    return user;
};

export const deleteUserService = async (id: string) => {
    const user = await prisma.user.delete({
        where: {
            id,
        },
    });

    return user;
};

export const updateUserService = async (
    id: string,
    data: Prisma.UserUpdateInput,
) => {
    const user = await prisma.user.update({
        where: {
            id,
        },
        data,
    });

    return user;
};

export const updateUserRoleService = async (id: string, role: Role) => {
    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            role,
        },
    });

    return user;
};
