import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogStatus } from './blog.status.enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';
import { Comment } from 'src/comments/comment.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  content: string;

  @Column()
  status: BlogStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @ManyToOne((_type) => User, (user) => user.blogs, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany((_type) => Comment, (comment) => comment.blog, { eager: false })
  comments: Comment[];
}
