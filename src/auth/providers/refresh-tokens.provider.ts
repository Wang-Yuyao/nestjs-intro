import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { In } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from '../interfaces/active-user.interface';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    @Inject(forwardRef(() =>UsersService) )
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}


  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
    // Here you would typically validate the refresh token,
     const {sub} = await this.jwtService.verifyAsync<Pick <ActiveUserData, 'sub'>>(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.usersService.findOneById(sub);
      return await this.generateTokensProvider.generateTokens(user);
      } catch (error) {
        throw new Error('Invalid refresh token');
      }
    }
}
