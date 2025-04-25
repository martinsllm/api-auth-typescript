import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-errors";
import bcrypt from "bcrypt"

export class UserController {
    async create(req: Request, res: Response): Promise<any> {
        const { name, email, password } = req.body

        const userExists = await userRepository.findOneBy({email})
        if(userExists) throw new BadRequestError('E-mail already registered!')

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            name,
            email,
            password: hashPassword
        })

        await userRepository.save(newUser)

        const { password:_, ...user } = newUser

        return res.status(201).json(user)
    }

    async getProfile(req: Request, res: Response): Promise<any> {
        return res.json(req.user)
    }
}