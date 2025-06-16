import { SignInDto } from './dtos/signin.dto';
import { AuthService } from './providers/auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    /*
     * Injecting Auth Service
     */
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK) // Setting HTTP status code to 200 for successful sign-in
  public async signIn(@Body() signInDto: SignInDto) {
    /*
     * Calling the signIn method from AuthService
     */
    return this.authService.signIn(signInDto);
  }
}
