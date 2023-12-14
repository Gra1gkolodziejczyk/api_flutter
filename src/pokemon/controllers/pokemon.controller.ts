import { Controller, Get } from '@nestjs/common';

import { Pokemon } from 'src/schemas/pokemon.schema';
import { PokemonService } from '../services/pokemon.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private pokemonService: PokemonService) {}

  @Get()
  async getPokemon(): Promise<Pokemon[]> {
    return this.pokemonService.getAllPokemon();
  }
}
