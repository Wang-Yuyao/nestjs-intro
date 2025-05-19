import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/providers/users.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/providers/posts.service';
import { AuthModule } from './auth/auth.module';
/*
 user created modules
*/

@Module({
  imports: [AuthModule, AuthModule],
  controllers: [AppController, UsersController, PostsController],
  providers: [AppService, UsersService, PostsService],
})
export class AppModule {}
