import * as jwt from 'jsonwebtoken';
import {User} from "@prisma/client";
import {conf} from "../config";
import {AuthUser, JwtTokenPair} from "../requests/auth";
import {JwtPayload} from "jsonwebtoken";
import {ClientException} from "../exceptions/exceptions";

export const generateJwtTokenPair = async (user: User) : Promise<JwtTokenPair> => {
    const accessToken = await createAccessToken(user);
    const refreshToken = await createRefreshToken(user);

    return {
        accessToken,
        refreshToken
    }
}

export const decodeJwt = async (token: string) : Promise<AuthUser> => {
    const secret = conf.JWT.SECRET || '';
    try {
        const data: JwtPayload = await jwt.verify(token, secret) as JwtPayload;
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role
        }
    } catch (e) {
        throw new ClientException("Invalid jwt token");
    }

}

const createAccessToken = async (user: User) : Promise<string> => {
    const expire = conf.JWT.ACCESS_TOKEN_EXPIRE || '';
    return sign(user, expire);
}

const createRefreshToken = async (user: User) : Promise<string> => {
    const expire = conf.JWT.REFRESH_TOKEN_EXPIRE || '';
    return sign(user, expire);
}

const sign = async (user: User, expire: string) : Promise<string> => {
    const secret = conf.JWT.SECRET || '';
    const issuer = conf.JWT.ISSUER || '';
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
            email: user.email,
            name: user.name
        },
        secret,
        {
            header: {
                typ: 'access',
                alg: 'HS256'
            },
            audience: user.email,
            issuer: issuer,
            algorithm: 'HS256',
            expiresIn: expire,
        }
    );
}

