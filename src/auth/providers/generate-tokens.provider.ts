import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from '../interfaces/active-user.interface';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(
    userId: number, expiresIn: number, payload?: T
  ) {  
   return await this.jwtService.signAsync(
          {
            sub: userId,
            ... payload, // Spread the payload if provided
          },
          {
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            expiresIn, // Use the TTL from the configuration
        });
  }
  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email }
      ),

      this.signToken(
        user.id,
        this.jwtConfiguration.refreshTokenTtl,
        { email: user.email }
      ),
    ])

    return {
      accessToken,
      refreshToken,
    };
  }
}

