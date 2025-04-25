import { Category } from '../entities/Category_exercice';
import { CategoryRepository } from '../repositories/category_exercice.repository';
import { CategoryType } from '@/types/enum.type';

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    return this.categoryRepository.create(categoryData);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  async getCategoryByName(name: CategoryType): Promise<Category | null> {
    return this.categoryRepository.findByName(name);
  }

  async updateCategory(id: number, updateData: Partial<Category>): Promise<Category | null> {
    return this.categoryRepository.update(id, updateData);
  }

  async deleteCategory(id: number): Promise<boolean> {
    return this.categoryRepository.delete(id);
  }

  async getCategoryWithExercices(id: number): Promise<Category | null> {
    return this.categoryRepository.findWithExercices(id);
  }
}