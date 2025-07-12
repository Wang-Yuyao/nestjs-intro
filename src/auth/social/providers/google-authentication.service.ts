import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClinet: OAuth2Client

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}
  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClinet = new OAuth2Client(clientId, clientSecret);
  }

  public async authentication(googleTokenDto: GoogleTokenDto) {
    const loginTicket = await this.oauthClinet.verifyIdToken({
      idToken: googleTokenDto.token,
    });
    console.log('loginTicket', loginTicket);
    const payload = loginTicket.getPayload();
    if (!payload) {
      throw new Error('Invalid Google token payload');
    }
    const { email, sub: googleId, given_name: firstName, family_name: lastName } = payload;

    const user = await this.usersService.findOneByGoogleId(googleId);

    if (user) {
      return this.generateTokenProvider.generateTokens(user);
    }
  }
}
