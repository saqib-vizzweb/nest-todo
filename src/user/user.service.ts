import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exits = await this.users.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (exits) {
      throw new BadRequestException('Email already exits');
    }

    const user = this.users.create(createUserDto);

    return this.users.save(user);
  }

  findAll() {
    return this.users.find();
  }

  async findOne(id: number) {
    const user = await this.users.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.users.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.users.delete(id);
  }

  async findByEmail(email: string) {
    const user = await this.users.findOne({ where: { email } });
    return user;
  }
}
