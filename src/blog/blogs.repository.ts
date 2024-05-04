import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import {
  ResponseHandlerType,
  responseHandler,
} from 'src/handler/responseHandler';
import { BlogStatus } from './blog.status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BlogsRepository extends Repository<Blog> {
  constructor(private dataSource: DataSource) {
    super(Blog, dataSource.createEntityManager());
  }

  async createBlog(
    createBlogDto: CreateBlogDto,
    user: User,
  ): Promise<ResponseHandlerType> {
    try {
      const { title, content } = createBlogDto;
      let slug = title
        .replace(/\s+/g, '-')
        .replace(/:/g, '-')
        .replace('/', '-')
        .replace(',', '')
        .toLowerCase();

      const existing_blog = await this.findOne({ where: { slug } });
      if (existing_blog) {
        slug = `${slug}-${Math.floor(10000 * Math.random() + 90000)}`;
      }

      const blog = this.create({
        title,
        slug: slug,
        content,
        status: BlogStatus.PUBLISHED,
        user,
      });
      await this.save(blog);
      return responseHandler({
        success: true,
        statusCode: 201,
        message: 'Blog Post has been published',
        data: blog,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
