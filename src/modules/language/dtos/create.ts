import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({
    type: 'string',
    maxLength: 64,
    example: 'Uzbek',
  })
  @IsString()
  @MaxLength(64)
  title: string;

  @ApiProperty({
    type: 'string',
    maxLength: 2,
    example: 'uz',
  })
  @IsString()
  @MaxLength(2)
  code: string;
}
