import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
  _id: string;
  name: string;
  url: string;
  type: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
