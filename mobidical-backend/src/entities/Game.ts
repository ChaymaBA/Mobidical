import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Progression } from "./Progression";

@Entity("games") // Renommé la table en "games"
export class Game {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column({ type: "varchar", length: 50, nullable: false })
  difficulty!: string; 

  @Column({ type: "varchar", length: 255, nullable: false })
  category!: string; 

  @Column({ type: "varchar", length: 500, nullable: true }) 
  description?: string; // Ajout d'une description

  @Column({ type: "varchar", length: 255, nullable: false }) 
  name!: string; // Ajout d'un titre pour le jeu

  @ManyToOne(() => User, (user) => user.games)
  user!: User;

  @ManyToOne(() => Progression, (progression) => progression.game)
  progression!: Progression;
  
  lancerGame(): void {
    // Implémentation de la logique de lancement du jeu
  }
}
