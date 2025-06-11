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
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
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

    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    private readonly createUserProvider: CreateUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
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

  public async createMany(createManyUsersDto: CreateManyUsersDto ) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }
}
