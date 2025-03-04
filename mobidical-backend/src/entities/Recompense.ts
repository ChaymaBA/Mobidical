import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Progression } from "./Progression";

@Entity("recompenses")
export class Recompense {
  @PrimaryGeneratedColumn()
  Id!: number; 

  @Column({ type: "varchar", length: 255, nullable: false })
  Nom!: string; 

  @Column({ type: "int", nullable: false })
  pointsNecessaires!: number; 

  @OneToMany(() => Progression, (progression) => progression.recompense)
  progression!: Progression[]; 

  attribuerRecompense(): void {
    
  }
}
