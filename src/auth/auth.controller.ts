import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SignInDto } from './dtos/signin.dto';
import { AuthType } from './enums/auth-type.enum';
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
  @Auth(AuthType.None) // No authentication required for sign-in
  public async signIn(@Body() signInDto: SignInDto) {
    /*
     * Calling the signIn method from AuthService
     */
    return this.authService.signIn(signInDto);
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK) // Setting HTTP status code to 200 for successful refreshTokens
  @Auth(AuthType.None) // No authentication required for refreshTokens
  public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    /*
     * Calling the refreshTokens method from AuthService
     */
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
