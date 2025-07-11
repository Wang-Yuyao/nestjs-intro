import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClinet: OAuth2Client

  constructor(
    @Inject(jwtConfig)
    private  readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}
  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClinet = new OAuth2Client(clientId, clientSecret);
  }
}
