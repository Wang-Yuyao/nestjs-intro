import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user.interface';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService)) // Forward reference to UsersService
    private readonly usersService: UsersService, // Assuming UsersService is imported and available
    private readonly hashingProvider: HashingProvider, // Assuming HashingProvider is defined elsewhere
    private readonly jwtService: JwtService, // Assuming JwtService is imported and available
    @Inject(jwtConfig.KEY) // Injecting JWT configuration
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  public async signIn(signInDto: SignInDto) {
    let user = await this.usersService.findOneByEmail(signInDto.email,);
    let isEqual : boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    }
    catch (error) {
      console.error('Error during password comparison:', error);
      throw new Error('Password comparison failed');
    }
    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.accessTokenTtl, // Use the TTL from the configuration
    })

    return {
      accessToken,
    };
  }
}
