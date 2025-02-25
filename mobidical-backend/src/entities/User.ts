import * as Entities from "@/entities/";

import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  @Generated()
  id!: number;

  @Column({ unique: true, nullable: false })
  username!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false })
  password_hash!: string;

  @Column({ default: false, nullable: false })
  is_active!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
  created_at!: Date;

  @OneToMany(() => Entities.UserSession, (userSession) => userSession.user)
  sessions!: Entities.UserSession[];

  @OneToMany(() => Entities.UserDevice, (userDevice) => userDevice.user)
  devices!: Entities.UserDevice[];

  @OneToMany(() => Entities.LoginAttempt, (loginAttempt) => loginAttempt.user)
  loginAttempts!: Entities.LoginAttempt[];
}