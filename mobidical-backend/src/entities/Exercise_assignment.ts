import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Children } from "./Children"; // Vérifie l'importation correcte de "Children"
import { Exercice } from "./Exercice"; // Vérifie l'importation correcte de "Exercice"
import { Reward } from "./Reward"; // Vérifie l'importation correcte de "Reward"

@Entity("exercise_assignments") // Table pour les assignations d'exercices
export class ExerciseAssignment {
  @PrimaryGeneratedColumn()
  id!: number; // UUID comme identifiant primaire

  @ManyToOne(() => Children, (child) => child.exerciseAssignments)
  child!: Children; // Relation avec l'entité "Children"

  @ManyToOne(() => Exercice, (exercice) => exercice.exerciseAssignments)
  exercise!: Exercice; // Relation avec l'entité "Exercice"

  @Column({ type: "boolean", default: false })
  is_completed!: boolean; // Indicateur si l'exercice a été complété

  @Column({ type: "int", default: 0 })
  attempts!: number; // Nombre d'essais

  @Column({ type: "float", default: 0 })
  score!: number; // Score obtenu

  @Column({ type: "int", default: 0 })
  checkPoint!: number;

  @ManyToOne(() => Reward, { nullable: true })
  reward?: Reward;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  assigned_at!: Date; // Timestamp de l'assignation de l'exercice

  @Column({ type: "timestamp", nullable: true })
  completed_at?: Date; // Timestamp de la complétion de l'exercice, si applicable
}
