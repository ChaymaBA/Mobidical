import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { DeviceInfo } from "@/types";
import { User } from "@/entities/";

@Entity("login_attempts")
export class LoginAttempt {
  @PrimaryGeneratedColumn()
  @Generated()
  id!: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user?: User;

  @Column({ nullable: false })
  ip_address!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
  attempted_at!: Date;

  @Column({
    type: "enum",
    enum: ["success", "failed"],
    nullable: false,
  })
  status!: "success" | "failed";

  @Column({ nullable: true })
  failure_reason?: string;

  @Column({ type: "json", nullable: true })  // Use JSON type for device_info
  device_info?: DeviceInfo; // Relate device info to UserDevice model
}
