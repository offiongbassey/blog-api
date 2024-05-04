import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentStatus } from './comment-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class CommentsRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async createComment(
    { message, blog }: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const comment = this.create({
      message,
      blog,
      user,
      status: CommentStatus.PENDING,
    });

    await this.save(comment);
    return comment;
  }
}
