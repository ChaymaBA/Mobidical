import * as Entities from "@/entities/";
import { Game } from "@/entities/Game"; // Vérifie l'importation correcte de "Game"
import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Feedback } from "./Feedback";
import { Activity } from "@/entities/";
import { UserRole } from "@/types/enum.type"; // Vérifie l'importation correcte de "UserRole"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  @Generated()
  id!: number;

  @Column({ unique: true, nullable: false })
  username!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false })
  password_hash!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role!: UserRole;

  @Column({ default: false, nullable: false })
  is_active!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
  created_at!: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: true })
  lastLogin?: Date;

  @Column({ type: 'text', nullable: true, default: null  })
  resetPasswordToken!: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null  })
  resetPasswordTokenExpiry!: Date | null;

  @OneToMany(() => Entities.UserSession, (userSession) => userSession.user)
  sessions!: Entities.UserSession[];

  @OneToMany(() => Entities.UserDevice, (userDevice) => userDevice.user)
  devices!: Entities.UserDevice[];

  @OneToMany(() => Entities.LoginAttempt, (loginAttempt) => loginAttempt.user)
  loginAttempts!: Entities.LoginAttempt[];

  @OneToMany(() => Game, (game) => game.user) // Corrigé la relation "games"
  games!: Game[]; // Corrigé le type ici aussi

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks!: Feedback[];

  @OneToMany(() => Activity, (activity) => activity.Utilisateur)
  activities!: Activity[];
}
