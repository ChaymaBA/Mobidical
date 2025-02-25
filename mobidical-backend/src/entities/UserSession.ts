import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DeviceInfo, Location } from "@/types";

import { User } from "@/entities/";

@Entity("user_sessions")
export class UserSession {
  @PrimaryGeneratedColumn()
  @Generated()
  id!: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user!: User;

  @Column({ unique: true, nullable: false })
  token!: string;

  @Column({ unique: true, nullable: true })
  refresh_token?: string;

  @Column({
    type: "enum",
    enum: ["mobile", "tablet", "desktop", "other"],
    nullable: false,
  })
  device_type!: "mobile" | "tablet" | "desktop" | "other";

  @Column({ type: "json", nullable: false })
  device_info!: DeviceInfo;

  @Column({ nullable: true })
  ip_address?: string;

  @Column({ type: "json", nullable: true })
  location?: Location;

  @Column({ default: true, nullable: false })
  is_active!: boolean;

  @Column({ nullable: false })
  last_activity_at!: Date;

  @Column({ nullable: false })
  expires_at!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
  created_at!: Date;
}