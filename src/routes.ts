import { Request, Response, Router } from "express";
import { BadRequestError } from "./helpers/api-errors";

const routes = Router()

routes.get('/', (req: Request, res: Response): any => {
    throw new BadRequestError('Erro lançado')
})

export default routes