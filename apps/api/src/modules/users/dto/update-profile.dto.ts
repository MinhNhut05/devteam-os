import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Theme } from '@prisma/client';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Nguyen Van A' })
  @IsString()
  @IsOptional()
  name?: string;

  // avatar is NOT here — only set via POST /users/me/avatar (file upload)
  // Allowing arbitrary string would enable path traversal attacks

  @ApiPropertyOptional({ enum: Theme, example: Theme.DARK })
  @IsEnum(Theme)
  @IsOptional()
  theme?: Theme;
}
