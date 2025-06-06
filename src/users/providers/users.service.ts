import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
  forwardRef,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { error } from 'console';
import { create } from 'domain';
/**
 * Controller class for '/users' API endpoint
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting User repository into UsersService
     * */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly configService: ConfigService,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    
    private readonly dataSource: DataSource,
  ) {}

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

    let newUser = this.usersRepository.create(createUserDto);

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

  /**
   * Public method responsible for handling GET request for '/users' endpoint
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limt: number,
    page: number,
  ) {
    throw new HttpException(
     { 
      status: HttpStatus.MOVED_PERMANENTLY,
      error: 'The API endopoint does not exist',
      fileName: 'users.service.ts',
      lineNumber: 97,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'The API endpoint does not exist',
      }
    )
  }

  /**
   * Public method used to find one user using the ID of the user
   */
  public async findOneById(id: number) {
    let user: User | null = null;
    try {
          user = await this.usersRepository.findOneBy({
      id,
    })
    } catch (error) {
      throw new RequestTimeoutException(
        'There was an error while fetching the user',
        {
          description: 'Error connecting to the database or processing the request',
        }
      );
    }
    if (!user) {
      throw new BadRequestException(
        'User with this ID does not exist',
        {
          description: 'User with this ID does not exist in the database',
        }
      );
    }   
    return user;
  }

  public async createMany(createUsersDto: CreateUserDto[] ) {

    let newUsers: User[] = [];
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let user of createUsersDto) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new RequestTimeoutException(
          'There was an error while creating the users',
          {
            description: 'Error connecting to the database or processing the request',
          }
        );
    } finally {
      await queryRunner.release();
    }
    return await this.usersRepository.save(createUsersDto);
  }
}
