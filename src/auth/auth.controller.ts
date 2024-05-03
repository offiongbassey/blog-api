import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthCredentialsDto,
  LoginCredentialsDto,
} from './dto/auth-credentials.dto';
import { ResponseHandlerType } from 'src/handler/responseHandler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<ResponseHandlerType> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  login(
    @Body() loginCredentialsDto: LoginCredentialsDto,
  ): Promise<ResponseHandlerType> {
    return this.authService.login(loginCredentialsDto);
  }
}
