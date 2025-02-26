import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity("activities")
export class Activity {
  @PrimaryGeneratedColumn()
  Id!: number; // ID de l'activité, généré automatiquement

  @ManyToOne(() => User, (user) => user.activities)
  Utilisateur!: User; // Relation avec l'entité User

  @Column({ type: "text", nullable: false })
  description!: string; // Description de l'activité

  participerActivite(): void {
    console.log(`${this.Utilisateur.username} participe à l'activité: ${this.description}.`);
  }
}