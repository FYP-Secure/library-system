import {HttpException} from "../exceptions/exceptions";
import {Request, Response, NextFunction} from "express";

export const errorMiddleware = async(error: HttpException, req: Request, res: Response, next: NextFunction ):
    Promise<void> => {
    const code = error.code || 500;
    const message = error.message || "internal server error";

    res.status(code)
        .send({
            status: code,
            message
        })
}