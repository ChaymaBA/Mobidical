import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from '@/entities';

@Entity("feedbacks")
export class Feedback {
  @PrimaryGeneratedColumn()
  Id!: number; 

  @ManyToOne(() => User, (user) => user.feedbacks)
  user!: User; 
  @Column({ type: "text", nullable: false })
  commentaire!: string; 

  @Column({ type: "int", nullable: false })
  note!: number;

  ajouterFeedback(): void {
   
  }
}
