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
