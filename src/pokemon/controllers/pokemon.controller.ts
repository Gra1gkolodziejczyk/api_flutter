import { Controller, Get, Param } from '@nestjs/common';

import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Pokemon } from 'src/schemas/pokemon.schema';
import { PokemonService } from '../services/pokemon.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private pokemonService: PokemonService) {}

  @ApiBearerAuth()
  @Get()
  async getPokemon(): Promise<Pokemon[]> {
    return this.pokemonService.getAllPokemon();
  }

  @ApiBearerAuth()
  @ApiParam({ name: '_id', type: String })
  @Get(':_id')
  async getPokemonsById(@Param('_id') _id: string): Promise<Pokemon> {
    return this.pokemonService.findPokemonById(_id);
  }
}
