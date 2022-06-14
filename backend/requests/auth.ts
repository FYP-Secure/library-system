import {Role} from "@prisma/client";

export type JwtTokenPair = {
    accessToken: string,
    refreshToken: string
}

export type AuthUser = {
    id: number,
    name: string,
    email: string,
    role: Role
}