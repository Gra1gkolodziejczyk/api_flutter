import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/schemas/pokemon.schema';
import { PokemonDto } from '../dto/pokemon.dto';
import { UpdatePokemonDto } from '../dto/updatePokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>,
  ) {}

  async getAllPokemon(): Promise<Pokemon[]> {
    return this.pokemonModel.find();
  }

  async CreatePokemon(creationPokemon: PokemonDto): Promise<Pokemon> {
    const createPokemon = new this.pokemonModel(creationPokemon);
    return createPokemon.save();
  }

  async updatePokemon(
    name: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    const updatePokemon = this.pokemonModel.findByIdAndUpdate(
      { name },
      updatePokemonDto,
    );
    if (!updatePokemon) {
      throw new NotFoundException(`Pokemon with this ${name} not found`);
    }
    return updatePokemon;
  }
}
