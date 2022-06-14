export abstract class HttpException extends Error {
    public code;

    protected constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}

export class ClientException extends HttpException {
    constructor(message: string) {
        super(message, 401);
    }
}

export class ForbiddenException extends HttpException {
    constructor(message: string) {
        super(message, 403);
    }
}