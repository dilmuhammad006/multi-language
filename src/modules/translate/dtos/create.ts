import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString, MaxLength } from 'class-validator';

export class CreateTranslateDto {
  @ApiProperty({
    type: 'string',
    example: 'test',
  })
  @IsString()
  code: string;

  @ApiProperty({
    type: 'object',
    properties: {},
  })
  @IsObject()
  definitions: Record<string, string>;
}
