import { Column, Entity,OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { ProgressReport } from "./Progress_Report";
import { Category } from "./Category_exercice"; 
import { Children } from "./Children"; 
import { ExerciseAssignment } from "./Exercise_assignment"; 
import { Difficulty } from "@/types/enum.type";

@Entity("exercices")  
export class Exercice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ 
    type: "enum",   
    enum:  Difficulty,
    nullable: false,
    })
  difficulty!: Difficulty;

  @Column({ type: "varchar", length: 500, nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @ManyToOne(() => User, (user) => user.exercices)
  user!: User;

  @ManyToOne(() => ProgressReport, (progressReport) => progressReport.exercices)
  progressReport!: ProgressReport;
  
  @Column({ type: "json", nullable: false })
  pieces!: { imageUrl: string; positionX: number; positionY: number }[];

  @ManyToOne(() => Category, (category) => category.exercices)
  category!: Category;

  @ManyToOne(() => Children, (child) => child.exercices)  
  child!: Children;

  @OneToMany(() => ExerciseAssignment, (assignment) => assignment.exercise)
  exerciseAssignments!: ExerciseAssignment[];

  lancerExercice(): void {
    // Implémentation de la logique de lancement de l'exercice
  }
}