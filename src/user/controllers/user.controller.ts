import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from '../../auth/services/auth.services';
import { CreateUserDto } from '../dto/user.dto';
import { LoginUserDto } from '../dto/login.dto';
import { UserServices } from '../services/user.service';
import { User } from 'src/schemas/user.schema';
import { LocalAuthGuards } from '../../auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private userServices: UserServices,
    private authService: AuthService,
  ) {}

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userServices.register(createUserDto);
  }

  @UseGuards(LocalAuthGuards)
  @Post('auth/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    if (
      await this.authService.validateUser(
        loginUserDto.email,
        loginUserDto.password,
      )
    ) {
      return this.authService.login(
        await this.userServices.findUserByEmail(loginUserDto.email),
      );
    }
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req): Promise<User> {
    return req.user;
  }
}
