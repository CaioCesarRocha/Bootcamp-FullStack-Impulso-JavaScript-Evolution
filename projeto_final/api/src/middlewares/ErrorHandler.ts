import { Request, Response, NextFunction } from 'express';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    const httpCode = error.statusCode || error?.response?.status || 500;
    if (error.toJSON) {
        error = error.toJSON();
    }
    return res.status(httpCode).json(error.message);
}

export default errorHandler;