import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.login(
      loginDto.username,
      loginDto.password,
    );

    response.cookie('token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/dashboard',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { message: 'Login successful' };
  }
}
