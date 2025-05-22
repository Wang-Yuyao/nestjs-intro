import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/providers/users.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/providers/posts.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
/*
 user created modules
*/

@Module({
  imports: [AuthModule, AuthModule, TypeOrmModule.forRootAsync({
    useFactory:() => ( {
    imports: [],
    inject: [],
    type: 'postgres',
    entities: [],
    synchronize: true,
    port: 5432,
    username: 'postgres',
    password: 'root',
    host: 'localhost',
    database: 'nestjs-blog'
    }),
  })],
  controllers: [AppController, UsersController, PostsController],
  providers: [AppService, UsersService, PostsService],
})
export class AppModule {}
