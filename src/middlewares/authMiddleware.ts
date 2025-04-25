import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";

type JwtPayload = {
    id: number
}

export const authMiddleware = async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
        const { authorization } = req.headers
        if(!authorization) throw new UnauthorizedError('Unauthorized!')

        const decodedToken = authorization.split(' ')[1]
        const { id } = jwt.verify(decodedToken, process.env.JWT_SECRET ?? '') as JwtPayload

        const user = await userRepository.findOneBy({id})
        if(!user) throw new UnauthorizedError('Unauthorized!')

        const {password:_, ...loggerUser} = user

        req.user = loggerUser

        next()
}