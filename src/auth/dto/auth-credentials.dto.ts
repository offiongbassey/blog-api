import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  first_name: string;

  @IsString()
  @MinLength(4)
  last_name: string;

  @IsString()
  @MinLength(11)
  phone: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(7)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 Uppercase, 1 Lowercase, digit and special character',
  })
  password: string;
}

export class LoginCredentialsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
