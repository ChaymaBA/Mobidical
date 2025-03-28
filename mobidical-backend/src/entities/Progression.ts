import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Game } from "./Game";
import { Recompense } from "./Recompense";

@Entity("progressions")
export class Progression {
  @PrimaryGeneratedColumn()
  Id!: number; 

  @Column({ type: "float", nullable: false })
  score!: number; 

  @Column({ type: "varchar", length: 255, nullable: false })
  date!: string; 

  @ManyToOne(() => Game, (game) => game.progression)
  game!: Game; 

  @ManyToOne(() => Recompense, (recompense) => recompense.progression)
  recompense!: Recompense; 

  enregistrerProgression(): void {
    
  }
}
