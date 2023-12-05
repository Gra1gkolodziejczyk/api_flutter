import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './user.dto';
import { IsNotEmpty } from '@nestjs/class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNotEmpty()
  verifyPassword: string;
}
