import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommentStatus } from './comment-status.enum';
import { Blog } from 'src/blog/blog.entity';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  status: CommentStatus.PENDING;

  @ManyToOne((_type) => Blog, (blog) => blog.comments, { eager: false })
  blog: string;

  @ManyToOne((_type) => User, (user) => user.comments, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
