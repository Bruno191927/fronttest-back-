import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicioModule } from './servicio/servicio.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule, registerAs } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [registerAs('app', () => ({ projectName: 'SolanaTest' }))],
    }),
    ServicioModule,
    CategoryModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
})
export class AppModule {}
