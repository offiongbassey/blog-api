import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
  ) {}

  createComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    return this.commentsRepository.createComment(createCommentDto, user);
  }

  async getCommentById(id: string, user: User): Promise<Comment> {
    console.log('User ', user);
    const found = await this.commentsRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException('Comment not found');
    }
    return found;
  }
}
