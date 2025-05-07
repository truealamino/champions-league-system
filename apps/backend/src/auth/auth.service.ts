import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';
import {LoginDto} from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.validateUser(loginDto.email, loginDto.password);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const payload = {sub: user.id, email: user.email, role: user.role};
    return {access_token: this.jwtService.sign(payload)};
  }
}
