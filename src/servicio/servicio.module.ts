import { Module } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Servicio, ServicioSchema } from './entities/servicio.entity';

@Module({
  controllers: [ServicioController],
  providers: [ServicioService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Servicio.name,
        schema: ServicioSchema,
      },
    ]),
  ],
})
export class ServicioModule {}
