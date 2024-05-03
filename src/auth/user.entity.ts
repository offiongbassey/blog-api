import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from './user.status.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  status: UserStatus;

  @Column()
  is_active: boolean;
}
