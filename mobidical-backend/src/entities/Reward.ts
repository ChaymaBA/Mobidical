import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ProgressReport } from "./Progress_Report";

@Entity("reward")
export class Reward {
  @PrimaryGeneratedColumn()
  Id!: number; 

  @Column({ type: "varchar", length: 255, nullable: false })
  Nom!: string; 

  @Column({ type: "int", nullable: false })
  pointsNecessaires!: number; 

  @OneToMany(() => ProgressReport, (progressReport) => progressReport.reward)
  progressReport!: ProgressReport[];

  attribuerRecompense(): void {
    
  }
}
