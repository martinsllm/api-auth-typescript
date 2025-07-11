import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";

export const errorMiddleware = (
    error: Error & Partial<ApiError>, 
    req: Request, 
    res: Response, 
    next: NextFunction
): any => {
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal Server Error'
    return res.status(statusCode).json({ message })
}