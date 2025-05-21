import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class UpdateDto {
  @ApiProperty()
  @IsString()
  name: string;

}
