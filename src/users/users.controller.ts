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
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  public getAllUsers() {
    return 'You have sent a GET request to /users (no ID)';
  }

  @Get('/:id')
  public getUsers(
    @Param('id', ParseIntPipe) id: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log('id:', typeof id);
    console.log('limit:', typeof limit);

    console.log('page:', typeof page);
    return 'You sent a GET request to users endpoint';
  }
  @Get('/:id')
  public getUserById(@Param() params: any, @Query() query: any) {
    console.log(params, query);
    return `You have sent a GET request to endpoints`;
  }

  @Post()
  public createUsers(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(createUserDto);
    console.log(headers);
    console.log(ip);

    return 'You have sent a post request to users endpoint';
  }
}
