import {ConflictException, Injectable} from '@nestjs/common';
import {User} from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import {PrismaService} from 'prisma/prisma.service';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({where: {email}});
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({where: {email}});
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('E-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role ?? 'USER', // ou 'ADMIN'
        name: data.name,
      },
    });
  }
}
