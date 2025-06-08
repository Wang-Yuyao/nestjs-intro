import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    private readonly dataSource: DataSource,) {}
  
  public async createMany(createManyUsersDto: CreateManyUsersDto ) {
      
      let newUsers: User[] = [];
      const queryRunner = this.dataSource.createQueryRunner();
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction(); 
      } catch(error) {
        throw new RequestTimeoutException(
          'There was an error while connecting to the database',
          {
            description: 'Error connecting to the database or processing the request',
          }
        );
      }

      try {
        for (let user of createManyUsersDto.users) {
          let newUser = queryRunner.manager.create(User, user);
          let result = await queryRunner.manager.save(newUser);
          newUsers.push(result);
        }
        await queryRunner.commitTransaction();
      } catch (error) {
          await queryRunner.rollbackTransaction();
          throw new ConflictException(
            'There was an error while creating users',
            {
              description: String(error),
            }
          );
      } finally {
        await queryRunner.release();
      }
      return newUsers;
    }
  }
    