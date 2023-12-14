import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
  name: string;
  url: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
