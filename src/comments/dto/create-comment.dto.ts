import { IsNotEmpty, IsUUID, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @MinLength(6)
  message: string;

  @IsNotEmpty()
  @IsUUID()
  blog: string;
}
