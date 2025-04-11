import { Exercice } from '../entities/Exercice';
import { ExerciceRepository } from '../repositories/exercice.repository';

export class ExerciceService {
  constructor(private exerciceRepository: ExerciceRepository) {}

  // Créer un nouvel exercice
  async createExercice(exerciceData: Partial<Exercice>): Promise<Exercice> {
    return this.exerciceRepository.create(exerciceData);
  }

  // Récupérer tous les exercices
  async getAllExercices(): Promise<Exercice[]> {
    return this.exerciceRepository.findAll();
  }

  // Récupérer les exercices d'un utilisateur spécifique
  async getExercicesByUser(userId: number): Promise<Exercice[]> {
    return this.exerciceRepository.findByUser(userId);
  }

  // Mettre à jour un exercice
  async updateExercice(id: number, updateData: Partial<Exercice>): Promise<Exercice | null> {
    return this.exerciceRepository.update(id, updateData);
  }

  // Supprimer un exercice
  async deleteExercice(id: number): Promise<boolean> {
    return this.exerciceRepository.delete(id);
  }
}
