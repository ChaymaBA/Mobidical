import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exercice } from "./Exercice";
import{ CategoryType } from "@/types/enum.type"; 



// Table pour les catégories
@Entity("categories") 
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: CategoryType,
    unique: true, 
  })
  name!: CategoryType;

  @OneToMany(() => Exercice, (exercice) => exercice.category) 
  exercices!: Exercice[]; 
}
