import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../users/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.email, loginDto.password)
      .then(user => {
        if (!user) {
          return { success: false, message: 'Invalid credentials' };
        }
        return this.authService.login(user);
      });
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.userService.findOneByEmail(registerDto.email);
    if (existingUser) {
      return { success: false, message: 'User with this email already exists' };
    }

    return this.authService.register({
      email: registerDto.email,
      username: registerDto.username,
      password: registerDto.password,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
    });
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }
}