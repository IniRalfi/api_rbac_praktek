import { Request, Response, NextFunction } from "express";
import { RegisterUseCase } from "../../core/use-cases/auth/register.usecase";
import { LoginUseCase } from "../../core/use-cases/auth/login.usecase";
import { UserRepository } from "../../infrastructure/database/user.repository";
import { sendSuccess, sendError } from "../../utils/response";

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly userRepository: UserRepository
  ) {}

  // Handler Registrgasi
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, phone, roleName } = req.body;

      if (!name || !email || !password || !roleName) {
        return sendError(res, "Missing required fields", 400);
      }

      const user = await this.registerUseCase.execute({
        name,
        email,
        password,
        phone,
        roleName,
      });

      return sendSuccess(res, user, "Registration successful", 201);
    } catch (error: any) {
      return sendError(res, error.message, 400);
    }
  };

  // Handler Login
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return sendError(res, "Missing email or password", 400);
      }
      const result = await this.loginUseCase.execute({ email, password });
      return sendSuccess(res, result, "Login successful");
    } catch (error: any) {
      return sendError(res, error.message, 401);
    }
  };

  // Handler profile user yang sedang login (me)
  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return sendError(res, "Unauthorized", 401);
      }

      const user = await this.userRepository.findById(userId);
      if (!user) {
        return sendError(res, "User not found", 404);
      }

      return sendSuccess(res, user, "User profile retrieved");
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  };
}
