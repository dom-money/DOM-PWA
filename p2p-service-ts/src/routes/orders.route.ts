import { Router } from 'express';
import { OrdersController } from '@/controllers/orders.controller';
import { Routes } from '@/interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { ActionRoute } from './actions.route';
import { CreateOrderDto } from '@/dtos/orders.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class OrderRoute implements Routes {
  public path = '/orders';
  public router = Router();
  public order = new OrdersController();
  public actionRoute = new ActionRoute();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.order.getOrders);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.order.getOrderById);
    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateOrderDto),
      AuthMiddleware,
      this.order.createOrder,
    );

    // Nesting `/actions` route
    this.router.use(`${this.path}`, this.actionRoute.router);
  }
}
