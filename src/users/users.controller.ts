import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Param,
  Post,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamsDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    // Injecting Users Service
    private readonly usersService: UsersService,
  )
  {}


  @Get()
  public getAllUsers() {
    return 'You have sent a GET request to /users (no ID)';
  }

  @Get('/:id')
  @ApiOperation({
    summary: "Fetches a list of registered users of app"
  })
  @ApiResponse({
    status: 200,
    description: "Users fetched data successfully",
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'the number of entries returned pre query',
    example: 10,
  })
    @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'the position of entries returned pre query',
    example: 10,
  })
  public getUsers(
    @Param() getUserParamDto: GetUsersParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUsers(
    @Body() createUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(createUserDto instanceof CreateUserDto);
    console.log(headers);
    console.log(ip);

    return 'You have sent a post request to users endpoint';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto){
    return patchUserDto;
  }
}
