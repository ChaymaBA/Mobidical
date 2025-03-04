import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Progression } from "./Progression";

@Entity("exercices")
export class Exercice {
  @PrimaryGeneratedColumn()
  Id!: number; 

  @Column({ type: "int", nullable: false })
  NiveauDeDifficulte!: number; 

  @Column({ type: "varchar", length: 255, nullable: false })
  type!: string; 

  @ManyToOne(() => User, (user) => user.exercices)
  user!: User;

  @ManyToOne(() => Progression, (progression) => progression.exercice)
  progression!: Progression;
  
  lancerExercice(): void {
   
  }
}
