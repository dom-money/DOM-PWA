import { Router } from 'express';
import { ActionsController } from '@/controllers/actions.controller';
import { Routes } from '@/interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateActionDto } from '@/dtos/actions.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class ActionRoute implements Routes {
  public router = Router();
  public path = '/:id/actions';
  public action = new ActionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.action.getActionsByOrderId);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.action.getActionById);
    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateActionDto),
      AuthMiddleware,
      this.action.createAction,
    );
  }
}
