import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(User) // Replace User with the actual entity class
      private readonly usersRepository: Repository<User>, // Replace with actual type of usersRepository
  ) {
  }
  public async findOneByEmail(email: string) {
    let user: User | null = null;
    try {
    user = await this.usersRepository.findOneBy({
      email, // Assuming 'email' is a column in your User entity
    });
  } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Could not find user by email');
    }
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
