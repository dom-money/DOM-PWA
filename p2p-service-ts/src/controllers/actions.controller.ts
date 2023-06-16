import { NextFunction, Request, Response } from 'express';
import { OrderService } from '@/services/orders.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class ActionsController {
  public action = new OrderService();

  public getActionsByOrderId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json({ data: {}, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getActionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.user.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.user.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
