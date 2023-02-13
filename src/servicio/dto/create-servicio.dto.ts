import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateServicioDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsMongoId()
  category: string;
}
