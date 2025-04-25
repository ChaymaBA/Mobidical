import { Request, Response } from 'express';
import { CategoryService } from '@/services/category_exercice.service';
import { handleError } from '@/core/errors/errorHandler';
import { CategoryType } from '@/types/enum.type';

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryData = req.body;

      const category = await this.categoryService.createCategory(categoryData);

      res.status(201).json({
        message: 'Category created successfully',
        category,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = parseInt(req.params.id);
      const category = await this.categoryService.getCategoryById(categoryId);
      
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      
      res.json(category);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getCategoryByName(req: Request, res: Response): Promise<void> {
    try {
      const categoryName = req.params.name as CategoryType;
      const category = await this.categoryService.getCategoryByName(categoryName);
      
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      
      res.json(category);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const updateData = req.body;
      const categoryId = parseInt(req.params.id);
      const updatedCategory = await this.categoryService.updateCategory(categoryId, updateData);

      if (!updatedCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }

      res.json({
        message: 'Category updated successfully',
        category: updatedCategory,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = parseInt(req.params.id);
      const isDeleted = await this.categoryService.deleteCategory(categoryId);

      if (!isDeleted) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }

      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}