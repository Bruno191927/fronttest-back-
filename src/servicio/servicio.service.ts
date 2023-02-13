import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServicioService {
  constructor(
    @InjectModel(Servicio.name) private readonly servicioModel: Model<Servicio>,
  ) {}

  async create(createServicioDto: CreateServicioDto) {
    try {
      const servicio = await this.servicioModel.create(createServicioDto);
      return servicio;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Contract exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(`Can't create Service`);
    }
  }

  async findAll() {
    return await this.servicioModel.find().select('-__v');
  }

  async findOne(id: string) {
    let servicio: Servicio;
    try {
      if (isValidObjectId(id)) {
        servicio = await this.servicioModel.findById(id).select('-__v');
      } else {
        throw new NotFoundException();
      }
      return servicio;
    } catch (error) {
      if (error.response.statusCode === 404)
        throw new NotFoundException(`Service with id:"${id}" not found`);

      throw new InternalServerErrorException(`Can't get Service`);
    }
  }

  async findAllByCategoryId(categoryId: string) {
    return await this.servicioModel.find({ category: categoryId });
  }

  async update(id: string, updateServicioDto: UpdateServicioDto) {
    const servicio = await this.findOne(id);
    return await this.servicioModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: updateServicioDto.name,
          description: updateServicioDto.description,
        },
      },
      { new: true },
    );
  }

  async remove(id: string) {
    const { deletedCount } = await this.servicioModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0) {
      throw new BadRequestException(`Servicio with id "${id}" not found`);
    }
    return;
  }
}
