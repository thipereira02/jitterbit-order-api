import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'thiago@dev.com', description: 'E-mail do usuário' })
  @IsEmail({}, { message: 'Forneça um e-mail válido' })
  email: string;

  @ApiProperty({ example: 'SenhaForte123', description: 'Senha de acesso (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}