import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getAllUsers() {
    return 'You have sent a GET request to /users (no ID)';
  }

  @Get('/:id')
  public getUserById(@Param() params: any, @Query() query: any) {
    console.log(params, query);
    return `You have sent a GET request to endpoints`;
  }

  @Post()
  public createUsers(@Body() request: any) {
    console.log(request);
    return 'You have sent a post request to users endpoint';
  }
}
