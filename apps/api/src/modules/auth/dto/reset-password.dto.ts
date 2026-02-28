import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'abc123-reset-token',
    description: 'Password reset token received via email',
  })
  @IsString({ message: 'Token must be a string' })
  @IsNotEmpty({ message: 'Token is required' })
  token: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'New password (6-72 characters)',
    minLength: 6,
    maxLength: 72,
  })
  @IsString({ message: 'New password must be a string' })
  @MinLength(6, { message: 'New password must be at least 6 characters' })
  @MaxLength(72, { message: 'New password must not exceed 72 characters' })
  newPassword: string;
}
