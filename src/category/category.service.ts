import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly companyModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.companyModel.create(createCategoryDto);
      return category;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Contract exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(`Can't create Company`);
    }
  }

  async findAll() {
    return await this.companyModel.find().select('-__v');
  }

  async findOne(id: string) {
    let category: Category;
    try {
      if (isValidObjectId(id)) {
        category = await this.companyModel.findById(id).select('-__v');
      } else {
        throw new NotFoundException();
      }
      return category;
    } catch (error) {
      if (error.response.statusCode === 404)
        throw new NotFoundException(`Category with id:"${id}" not found`);

      throw new InternalServerErrorException(`Can't get Category`);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    return await this.companyModel.findByIdAndUpdate(
      id,
      {
        $set: { name: updateCategoryDto.name },
      },
      { new: true },
    );
  }

  async remove(id: string) {
    const { deletedCount } = await this.companyModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0) {
      throw new BadRequestException(`Category with id "${id}" not found`);
    }
    return;
  }
}
