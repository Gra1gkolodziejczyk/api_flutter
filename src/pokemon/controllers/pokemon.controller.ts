import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuards } from 'src/auth/guards/local-auth.guard';
import { Pokemon } from 'src/schemas/pokemon.schema';
import { PokemonDto } from '../dto/pokemon.dto';
import { PokemonService } from '../services/pokemon.service';

import { UpdatePokemonDto } from '../dto/updatePokemon.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private pokemonService: PokemonService) {}

  // @UseGuards(LocalAuthGuards)
  @Get()
  async getPokemon(): Promise<Pokemon[]> {
    return this.pokemonService.getAllPokemon();
  }

  @UseGuards(LocalAuthGuards)
  @Post('pokemons/create')
  async postPokemon(@Body() creationPokemon: PokemonDto): Promise<Pokemon> {
    return await this.pokemonService.CreatePokemon(creationPokemon);
  }

  @UseGuards(LocalAuthGuards)
  @Post('pokemons/update')
  async updatePokemon(
    @Body() name: string,
    updatePokemon: UpdatePokemonDto,
  ): Promise<Pokemon> {
    return await this.pokemonService.updatePokemon(name, updatePokemon);
  }
}
