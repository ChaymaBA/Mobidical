import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity("activities")
export class Activity {
  @PrimaryGeneratedColumn()
  Id!: number; 

  @ManyToOne(() => User, (user) => user.activities)
  Utilisateur!: User; 

  @Column({ type: "text", nullable: false })
  description!: string; 

  participerActivite(): void {
    
  }
}