import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { RegisterUseCase } from "../../core/use-cases/auth/register.usecase";
import { LoginUseCase } from "../../core/use-cases/auth/login.usecase";
import { UserRepository } from "../../infrastructure/database/user.repository";

const dummyAuthMiddleware = (req: any, res: any, next: any) => {
  next();
};

export const createAuthRouter = (): Router => {
  const router = Router();
  // Dependency Injection (Penyuntikan dependensi secara manual)
  const userRepository = new UserRepository();
  const registerUseCase = new RegisterUseCase(userRepository);
  const loginUseCase = new LoginUseCase(userRepository);
  const authController = new AuthController(registerUseCase, loginUseCase, userRepository);
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/me", dummyAuthMiddleware, authController.me);
  return router;
};
