import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";

const routes = Router()

const userController = new UserController()
const loginController = new LoginController()

routes.post('/user', userController.create)
routes.post('/login', loginController.login)

export default routes