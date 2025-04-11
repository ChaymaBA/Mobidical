import { Request, Response } from 'express';
import { ChildrenService } from '@/services/children.service';
import { handleError } from '@/core/errors/errorHandler';
import { 
  ChildrenCreateDto, 
  ChildrenUpdateDto, 
  transformChildrenToResponse
} from '@/dtos/children.dto';
import { UserRole } from '@/types/enum.type';

export class ChildrenController {
  constructor(private childrenService: ChildrenService) {}

  async createChild(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = ChildrenCreateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const childData = validationResult.data;
      if (req.user?.role !== UserRole.ADMIN && childData.user_id !== req.user?.id) {
        res.status(403).json({
          message: 'You can only create a child profile for yourself',
        });
        return;
      }

      const child = await this.childrenService.createChild(childData);
      const responseData = transformChildrenToResponse(child, req.user?.role as UserRole);

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

      if (req.user?.role === UserRole.ADMIN) {
        const responseData = transformChildrenToResponse(children, UserRole.ADMIN);
        res.json(responseData);
      } else if (req.user) {
        const userChildren = children.filter(child => req.user && child.user_id === req.user.id);
        const responseData = transformChildrenToResponse(userChildren, UserRole.USER);
        res.json(responseData);
      } else {
        res.status(403).json({ message: 'Unauthorized access' });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async getChildById(req: Request, res: Response): Promise<void> {
    try {
      const childId = parseInt(req.params.id);
      if (isNaN(childId)) {
        res.status(400).json({ message: 'Invalid child ID' });
        return;
      }
      
      const child = await this.childrenService.getChildById(childId);

      if (!child) {
        res.status(404).json({ message: 'Child not found' });
        return;
      }

      if (
        req.user?.role === UserRole.ADMIN ||
        child.user_id === req.user?.id
      ) {
        const responseData = transformChildrenToResponse(child, req.user?.role as UserRole);
        res.json(responseData);
      } else {
        res.status(403).json({ message: 'You are not authorized to view this child' });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async getChildrenByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        res.status(400).json({ message: 'Invalid user ID' });
        return;
      }

      if (req.user?.role !== UserRole.ADMIN && req.user?.id !== userId) {
        res.status(403).json({ message: 'You can only view your own children' });
        return;
      }

      const children = await this.childrenService.getChildrenByUser(userId);
      const responseData = transformChildrenToResponse(children, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateChild(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = ChildrenUpdateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const updateData = validationResult.data;
      const childId = parseInt(req.params.id);
      if (isNaN(childId)) {
        res.status(400).json({ message: 'Invalid child ID' });
        return;
      }

      const existingChild = await this.childrenService.getChildById(childId);
      if (!existingChild) {
        res.status(404).json({ message: 'Child not found' });
        return;
      }

      if (
        req.user?.role !== UserRole.ADMIN &&
        existingChild.user_id !== req.user?.id
      ) {
        res.status(403).json({ message: 'You can only update your own children' });
        return;
      }

      const updatedChild = await this.childrenService.updateChild(childId, updateData);
      const responseData = transformChildrenToResponse(updatedChild, req.user?.role as UserRole);

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
      if (isNaN(childId)) {
        res.status(400).json({ message: 'Invalid child ID' });
        return;
      }

      const existingChild = await this.childrenService.getChildById(childId);
      if (!existingChild) {
        res.status(404).json({ message: 'Child not found' });
        return;
      }

      if (
        req.user?.role !== UserRole.ADMIN &&
        existingChild.user_id !== req.user?.id
      ) {
        res.status(403).json({ message: 'You can only delete your own children' });
        return;
      }

      await this.childrenService.deleteChild(childId);

      res.json({ message: 'Child deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}