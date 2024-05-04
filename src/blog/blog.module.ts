import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogsRepository } from './blogs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), AuthModule],
  providers: [BlogService, BlogsRepository],
  controllers: [BlogController],
})
export class BlogModule {}
