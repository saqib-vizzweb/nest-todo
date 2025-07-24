import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await this.comparePassword(
      signInDto.password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException("Password doesn't match");
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const exists = await this.userService.findByEmail(signUpDto.email);
    if (exists) {
      throw new UnauthorizedException('Email already exits');
    }
    const hashedPassword = await this.hashPassword(signUpDto.password);

    return this.userService.create({
      ...signUpDto,
      password: hashedPassword,
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
