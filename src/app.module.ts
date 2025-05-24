import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/providers/posts.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { PostsModule } from './posts/posts.module';
/*
 user created modules
*/

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRootAsync({
    useFactory:() => ( {
    imports: [],
    inject: [],
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
    port: 5432,
    username: 'postgres',
    password: 'root',
    host: 'localhost',
    database: 'nestjs-blog'
    }),
  }), TagsModule, MetaOptionsModule, PostsModule],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
