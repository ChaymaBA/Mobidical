import { Exercice } from '../entities/Exercice';
import { Repository, DataSource } from 'typeorm';

export class ExerciceRepository {
  private repository: Repository<Exercice>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Exercice);
  }

  // Méthode pour récupérer tous les exercices
  async findAll(): Promise<Exercice[]> {
    return this.repository.find();  
  }

  // Méthode pour récupérer les exercices d'un utilisateur spécifique
  async findByUser(userId: number): Promise<Exercice[]> {
    return this.repository.find({ where: { user: { id: userId } } });  
  }

  // Méthode pour créer un exercice
  async create(dto: Partial<Exercice>): Promise<Exercice> {
    const exercice = this.repository.create(dto);  
    return this.repository.save(exercice);  
  }

  // Méthode pour mettre à jour un exercice
  async update(id: number, dto: Partial<Exercice>): Promise<Exercice | null> {
    const exercice = await this.repository.findOne({ where: { id } });
    if (!exercice) {
      return null;
    }

    Object.assign(exercice, dto);
    return this.repository.save(exercice);  
  }

  // Méthode pour supprimer un exercice
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);  
    return result.affected !== 0;  
  }
}
