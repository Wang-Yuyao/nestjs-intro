import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
  ){}


  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    console.log("find all")
    return [
    {
      user: user,
      title: 'Test Title',
      content: 'Test Content',
    },
    {
      title: 'Test Title2',
      content: 'Test Content2',
    },
  ]
  }
}
