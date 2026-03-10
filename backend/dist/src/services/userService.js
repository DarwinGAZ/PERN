import { hashPassword } from "../libs/bcrypt.js";
import prisma from "../libs/prisma.js";
export const getAllUsersService = async () => {
    const users = await prisma.user.findMany();
    return users;
};
export const createUserService = async (data) => {
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
export const getUserByEmailService = async (email) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
};
export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    return user;
};
export const deleteUserService = async (id) => {
    const user = await prisma.user.delete({
        where: {
            id,
        },
    });
    return user;
};
export const updateUserService = async (id, data) => {
    const user = await prisma.user.update({
        where: {
            id,
        },
        data,
    });
    return user;
};
export const updateUserRoleService = async (id, role) => {
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
//# sourceMappingURL=userService.js.map