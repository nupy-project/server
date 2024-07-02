import { IsArray, IsEmail, IsEnum, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/features/user/interfaces/roles.interface';

export class RegisterAuthDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'John Doe',
    minLength: 3,
    maxLength: 20,
  })
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
    minLength: 6,
    maxLength: 20,
  })
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    description: 'Roles del usuario',
    example: [UserRole.USER, UserRole.Admin],
    isArray: true,
    enum: UserRole,
  })
  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];
}
