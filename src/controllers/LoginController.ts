import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-errors";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class LoginController {

    async login(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body

        const user = await userRepository.findOneBy({email})
        if(!user) throw new BadRequestError('Invalid E-mail or Password!')

        const verifyPass = await bcrypt.compare(password, user.password)
        if(!verifyPass) throw new BadRequestError('Invalid E-mail or Password!')

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '8h'})

        const {password:_, ...userLogin} = user

        return res.json({
            user: userLogin,
            token
        })
    }

}