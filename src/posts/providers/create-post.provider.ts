import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
      /*
      * Injecting Users Service
      */
      private readonly usersService: UsersService,
    
      /**
      * Injecting postsRepository
      */
      @InjectRepository(Post)
      private readonly postsRepository: Repository<Post>,
        
      private readonly tagService: TagsService,  
  ) {}
    public async create(@Body() createPostDto: CreatePostDto, user: ActiveUserData) {
      let author;
      let tags;
      try {
         author = await this.usersService.findOneById(user.sub);
        if (!author) {
          throw new NotFoundException('Author not found');
        }
         tags = await this.tagService.findMultipleTags(
            createPostDto.tags ?? [],
          );
      } catch (error) {
        throw new NotFoundException('Error creating post');
      }
      if (createPostDto.tags?.length !== tags.length) {
        throw new NotFoundException('Some tags not found');
      }
      const post = this.postsRepository.create({
            author,
            tags: tags,
          });
      try {
      return await this.postsRepository.save(post);
      } catch (error) {
        throw new NotFoundException('Error saving post');
      }
    }
}
