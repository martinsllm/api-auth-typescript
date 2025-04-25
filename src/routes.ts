import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router()

const userController = new UserController()
const loginController = new LoginController()

routes.post('/user', userController.create)
routes.post('/login', loginController.login)

routes.use(authMiddleware)

routes.get('/profile', userController.getProfile)

export default routes