import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { BoardType } from '../enum/BoardType.enum';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', name: 'board_type', enum: BoardType })
  boardType: BoardType;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  content: Text;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.nickname)
  @JoinColumn({ name: 'nickname' })
  nickname: User;
}
