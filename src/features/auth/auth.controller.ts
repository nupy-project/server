import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserRole } from '../user/interfaces/roles.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  handleLogin(@Body() loginBody: LoginAuthDto) {
    return this.authService.login(loginBody);
  }



  @Post('signup')
  registerSuperAdmin(@Body() registerBody: RegisterAuthDto) {
    return this.authService.register(registerBody, UserRole.USER);
  }

  // @Post('signup/super-admin-ceo')
  // registerSuperAdminCeo(@Body() registerBody: RegisterAuthDto) {
  //   return this.authService.registerSuperAdminCeo(registerBody, UserRole.SuperAdminCeo);
  // }
}
