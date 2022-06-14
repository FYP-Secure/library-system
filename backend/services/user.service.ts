import {PrismaClient, Role, User} from "@prisma/client";
import {encrypt, matchPassword} from "./password.service";
import {Login, UserRegister} from "../requests/user";
import {ForbiddenException} from "../exceptions/exceptions";

export const login = async (loginBody: Login) : Promise<User> => {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            email: loginBody.userName,
        }
    });

    if (!user) {
        throw new ForbiddenException("User doesn't exists");
    }

    const passwordMatched = await matchPassword(loginBody.password, user.password);

    if (!passwordMatched) {
        throw new ForbiddenException("Wrong password");
    }

    return user;
};

export const registerStudent = async (registerBody: UserRegister) : Promise<User> => {
    return registerUser(registerBody, Role.STUDENT);
};

export const registerAdmin = async (registerBody: UserRegister) : Promise<User> => {
    return registerUser(registerBody, Role.ADMIN);
}

export const registerUser = async (registerBody: UserRegister, role: any) : Promise<User> => {
    const prisma = new PrismaClient;

    const user = await getUserByEmail(registerBody.email);

    if (user)
        throw new Error("User exists")

    const encryptedPassword = await encrypt(registerBody.password);

    return await prisma.user.create({
        data: {
            email: registerBody.email,
            name: registerBody.name,
            password: encryptedPassword,
            role: role
        }
    });
}

export const getUserById = async (id: number) : Promise<User | null> => {
    const prisma = new PrismaClient();
    return await prisma.user.findUnique({
        where: {
            id
        }
    });
}

export const getUserByEmail = async (email: string) : Promise<User | null> => {
    const prisma = new PrismaClient();
    return await prisma.user.findUnique({
        where: {
            email
        }
    });
}

