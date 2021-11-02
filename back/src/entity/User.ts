import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Comment } from './Comment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'provider_id' })
  providerId: string;

  @Column({ type: 'varchar', length: 45 })
  nickname: string;

  @Column()
  gender: number;

  @Column()
  age: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany((type) => Comment, (comment) => comment.worldcup)
  comments: Comment[];
}
