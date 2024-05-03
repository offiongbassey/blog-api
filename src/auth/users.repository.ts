// import * as bcrypt from 'bcryptjs';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserStatus } from './user.status.enum';
import * as bcrypt from 'bcryptjs';
import {
  ResponseHandlerType,
  responseHandler,
} from 'src/handler/responseHandler';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<ResponseHandlerType> {
    try {
      const { first_name, last_name, phone, email, password } =
        authCredentialsDto;

      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(password, salt);

      const user = this.create({
        first_name,
        last_name,
        phone,
        email,
        password: hashed_password,
        status: UserStatus.ACTIVE,
        is_active: false,
      });
      await this.save(user);

      return responseHandler({
        success: true,
        statusCode: 201,
        message: 'Account created successfully',
      });
    } catch (error) {
      console.log(error.code);
      if (error.code == 23505) {
        throw new ConflictException('Email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
