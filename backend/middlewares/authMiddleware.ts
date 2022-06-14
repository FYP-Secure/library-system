import {Role} from "@prisma/client";
import {Request, Response, NextFunction} from "express";
import {decodeJwt} from "../services/jwt.service";
import {ClientException, ForbiddenException} from "../exceptions/exceptions";

export const requireAuth = (roles: Role[] = [Role.STUDENT, Role.ADMIN, Role.SUPER_ADMIN]) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const jwt = await extractJwtFromHeader(req);

            if (!jwt)
                throw new ClientException("Please login first!")

            const authUser = await decodeJwt(jwt);

            if (!roles.includes(authUser.role))
                throw new ForbiddenException("Forbidden request!")

            res.locals.user = authUser;

            next();
        } catch (e) {
            next(e);
        }
    }
}



const extractJwtFromHeader = async (req: Request) : Promise<string> => {
    return req.headers.authorization?.substr(7) || '';
}