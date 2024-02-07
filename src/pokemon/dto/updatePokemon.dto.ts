import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsNotEmpty } from '@nestjs/class-validator';
import { PokemonDto } from './pokemon.dto';

export class UpdatePokemonDto extends PartialType(PokemonDto) {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
