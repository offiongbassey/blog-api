import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ResponseHandlerType } from 'src/handler/responseHandler';
import { User } from 'src/auth/user.entity';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogsRepository)
    private blogsRepository: BlogsRepository,
  ) {}

  async createBlogPost(
    createBlogDto: CreateBlogDto,
    user: User,
  ): Promise<ResponseHandlerType> {
    return this.blogsRepository.createBlog(createBlogDto, user);
  }

  async getBlogPostById(id: string, user: User): Promise<Blog> {
    const post = await this.blogsRepository.findOne({ where: { id, user } });
    if (!post) {
      throw new NotFoundException('Blog Post not found');
    }
    return post;
  }
}
