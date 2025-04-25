import { Category } from '../entities/Category_exercice';
import { Repository, DataSource } from 'typeorm';
import { CategoryType } from '@/types/enum.type';

export class CategoryRepository {
  private repository: Repository<Category>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Category | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByName(name: CategoryType): Promise<Category | null> {
    return this.repository.findOne({ where: { name } });
  }

  async create(dto: Partial<Category>): Promise<Category> {
    const category = this.repository.create(dto);
    return this.repository.save(category);
  }

  async update(id: number, dto: Partial<Category>): Promise<Category | null> {
    const category = await this.repository.findOne({ where: { id } });
    if (!category) {
      return null;
    }

    Object.assign(category, dto);
    return this.repository.save(category);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async findWithExercices(id: number): Promise<Category | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['exercices']
    });
  }
}