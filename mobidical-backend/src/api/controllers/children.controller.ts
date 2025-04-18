import { Request, Response } from 'express';
import { ChildrenService } from '@/services/children.service';
import { handleError } from '@/core/errors/errorHandler';
import {
  transformSingleChildToResponse,
  transformChildrenToResponse
} from '@/dtos/children.dto';
import { UserRole } from '@/types/enum.type';

export class ChildrenController {
  constructor(private childrenService: ChildrenService) {}

  async createChild(req: Request, res: Response): Promise<void> {
    try {
      const childData = req.body;
      const userId = req.user?.id as number; // Get user ID from the token
      const child = await this.childrenService.createChild(childData, userId); // Pass userId
      const responseData = transformSingleChildToResponse(child, req.user?.role as UserRole);

      res.status(201).json({
        message: 'Child created successfully',
        child: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllChildren(req: Request, res: Response): Promise<void> {
    try {
      const children = await this.childrenService.getAllChildren();
      const responseData = transformChildrenToResponse(children, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getChildById(req: Request, res: Response): Promise<void> {
    try {
      const childId = parseInt(req.params.id);
      const child = await this.childrenService.getChildById(childId);

      if (!child) {
        res.status(404).json({ message: 'Child not found' });
        return;
      }

      const responseData = transformSingleChildToResponse(child, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getChildrenByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as number; // Get user ID from the token
      const children = await this.childrenService.getChildrenByUser(userId); // Use token userId
      const responseData = transformChildrenToResponse(children, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateChild(req: Request, res: Response): Promise<void> {
    try {
      const childId = parseInt(req.params.id);
      const updateData = req.body;

      const updatedChild = await this.childrenService.updateChild(childId, updateData);

      if (!updatedChild) {
        res.status(404).json({ message: 'Child not found' });
        return;
      }

      const responseData = transformSingleChildToResponse(updatedChild, req.user?.role as UserRole);
      res.json({
        message: 'Child updated successfully',
        child: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteChild(req: Request, res: Response): Promise<void> {
    try {
      const childId = parseInt(req.params.id);
      const deleted = await this.childrenService.deleteChild(childId);

      if (!deleted) {
        res.status(404).json({ message: 'Child not found or already deleted' });
        return;
      }

      res.json({ message: 'Child deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}
