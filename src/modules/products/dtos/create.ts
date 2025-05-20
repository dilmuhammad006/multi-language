import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsInt()
  price: number;

  @ApiProperty()
  @IsString()
  category_id: string;
}
