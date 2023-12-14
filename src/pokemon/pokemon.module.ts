import { Pokemon, PokemonSchema } from 'src/schemas/pokemon.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './services/pokemon.service';
import { PokemonsController } from './controllers/pokemon.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
  controllers: [PokemonsController],
  providers: [PokemonService],
  exports: [PokemonService],
})
export class PokemonModule {}
