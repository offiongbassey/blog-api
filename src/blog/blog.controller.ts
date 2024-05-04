import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreateBlogDto } from './dto/create-blog.dto';
import { ResponseHandlerType } from 'src/handler/responseHandler';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';

@Controller('blog')
@UseGuards(AuthGuard())
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/create')
  createBlogPost(
    @Body() createBlogDto: CreateBlogDto,
    @GetUser() user: User,
  ): Promise<ResponseHandlerType> {
    return this.blogService.createBlogPost(createBlogDto, user);
  }

  @Get('/:id')
  getBlogPostById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Blog> {
    return this.blogService.getBlogPostById(id, user);
  }
}
