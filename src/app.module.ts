import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemonsController } from './pokemon/controllers/pokemon.controller';
import { UserModule } from './user/user.module';
import { UsersController } from './user/controllers/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DATABASE_MONGODB_URL),
    UserModule,
    AuthModule,
    PokemonModule,
  ],
  controllers: [AppController, UsersController, PokemonsController],
  providers: [AppService],
})
export class AppModule {}
