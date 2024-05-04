import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import {
  AuthCredentialsDto,
  LoginCredentialsDto,
} from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcryptjs';
import {
  ResponseHandlerType,
  responseHandler,
} from 'src/handler/responseHandler';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<ResponseHandlerType> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async login(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<ResponseHandlerType> {
    const { email, password } = loginCredentialsDto;
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { id: user.id };
      const access_token = await this.jwtService.sign(payload);
      // const { first_name, last_name, phone } = user;
      return responseHandler({
        success: true,
        statusCode: 200,
        message: 'Login successful',
        data: { /*first_name, last_name, */ email, /*phone,*/ access_token },
      });
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
