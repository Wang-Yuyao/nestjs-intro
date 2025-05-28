import { CreatePostDto } from '../dtos/create-post.dto';
import { Injectable } from '@nestjs/common';
import { MetaOptionsService } from './../../meta-options/meta-options.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
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

    /**
     * Inject metaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Method to create a new post
   */
public async create(createPostDto: CreatePostDto) {
  const {
    metaOptions: metaOptionsDto,
    ...postFields
  } = createPostDto;

  const metaOptions = metaOptionsDto
    ? this.metaOptionsRepository.create(metaOptionsDto)
    : undefined;

  const post = this.postsRepository.create({
    ...postFields,
    metaOptions,
  });

  return await this.postsRepository.save(post);
}

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    
    let posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
      }
    });

    return posts;
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);
    return { deleted: true, id}
  }
}
