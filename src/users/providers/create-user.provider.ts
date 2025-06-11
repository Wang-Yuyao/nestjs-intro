import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Injecting User repository into CreateUserProvider
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Injecting HashingProvider 
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

  ){}
    public async createUser(createUserDto: CreateUserDto) {
  
      let existingUser: User | null = null;
  
      try {
  
        existingUser =  await this.usersRepository.findOne({
          where: { email: createUserDto.email },
      });
      } catch (error) {
        // Handle exceptions if user exists later
        throw new RequestTimeoutException(
  
          'There was an error while checking if user exists',
          {
            description: 'Error connecting to the database or processing the request',
          }
        );
      }
  
      if (existingUser) {
        // If user already exists, throw an exception
        throw new BadRequestException(
          'User with this email already exists',
          {
            description: 'User with this email already exists in the database',
          }
        );
      }
  
      let newUser = this.usersRepository.create({
        ... createUserDto,
        password: await this.hashingProvider.hashPassword(createUserDto.password),
      });
      
      try{
        newUser = await this.usersRepository.save(newUser);
      } catch (error) {
        throw new RequestTimeoutException(
          'There was an error while creating the user',
          {
            description: 'Error connecting to the database or processing the request',      
      }
        );
      } 
  
      // Create the user
      return newUser;
    }
}
