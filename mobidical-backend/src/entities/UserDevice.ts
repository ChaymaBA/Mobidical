import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from "@/entities/";

@Entity('user_devices')
export class UserDevice {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'text' ,nullable: false })
  device_token!: string;

  @Column({
    type: 'enum',
    enum: ['ios', 'android', 'web'],
    nullable: false,
  })
  device_type!: 'ios' | 'android' | 'web';

  @Column({ default: true })
  is_active!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_used_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}
