import { Game } from '../entities/Game';
import { Repository, DataSource } from 'typeorm';

export class GameRepository {
  private repository: Repository<Game>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Game);
  }

  // Méthode pour récupérer tous les jeux
  async findAll(): Promise<Game[]> {
    return this.repository.find();  
  }

  // Méthode pour récupérer les jeux d'un utilisateur spécifique
  async findByUser(userId: number): Promise<Game[]> {
    return this.repository.find({ where: { id: userId } });  
  }

  // Méthode pour créer un jeu
  async create(dto: Partial<Game>): Promise<Game> {
    const game = this.repository.create(dto);  
    return this.repository.save(game);  
  }

  // Méthode pour mettre à jour un jeu
  async update(id: number, dto: Partial<Game>): Promise<Game | null> {
    const game = await this.repository.findOne({ where: { id: id } });
    if (!game) {
      return null;
    }

    Object.assign(game, dto);
    return this.repository.save(game);  
  }

  // Méthode pour supprimer un jeu
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);  
    return result.affected !== 0;  
  }
}
