import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService)) // Forward reference to UsersService
    private readonly usersService: UsersService, // Assuming UsersService is imported and available
    private readonly hashingProvider: HashingProvider, // Assuming HashingProvider is defined elsewhere
    private readonly generateTokensProvider: GenerateTokensProvider, // Assuming GenerateTokensProvider is defined elsewhere
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
    
    return await this.generateTokensProvider.generateTokens(user);
  }
}
