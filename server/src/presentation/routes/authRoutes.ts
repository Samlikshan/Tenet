import { Router } from "express";
import { container } from "../../infrastructure/inversify.config";
import TYPES from "../../infrastructure/types";
import AuthController from "../controllers/Auth/AuthController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

const authController = container.get<AuthController>(TYPES.AuthController);
const authMiddleware = container.get<AuthMiddleware>(TYPES.IAuthMiddleware);

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));

export default router;
