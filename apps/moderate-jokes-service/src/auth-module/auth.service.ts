import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto, ResponseDto } from '../../../../libs/types/src';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validate(email: string, password: string) {
    if (email !== this.configService.get('DEFAULT_LOGIN_USERNAME')) {
      return null;
    }

    if (password !== this.configService.get('DEFAULT_LOGIN_PASSWORD')) {
      return null;
    }

    return new AuthUserDto({
      email: this.configService.get('DEFAULT_LOGIN_USERNAME'),
    });
  }

  async login(loggedUser: AuthUserDto) {
    const payload = {
      email: loggedUser.email,
    };

    return ResponseDto.success({
      message: 'Logged in',
      data: {
        user: new AuthUserDto({ email: payload.email }),
        access_token: this.jwtService.sign(payload),
      },
    });
  }
}
