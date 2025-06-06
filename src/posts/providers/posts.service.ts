import { CreatePostDto } from '../dtos/create-post.dto';
import { BadRequestException, Body, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import {Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tags/tag.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

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

    private readonly tagService: TagsService,
  ) {}

  /**
   * Method to create a new post
   */
  public async create(@Body() createPostDto: CreatePostDto) {
 const author = await this.usersService.findOneById(createPostDto.authorId);
  if (!author) {
    throw new NotFoundException('Author not found');
  }

  const { authorId, metaOptions, ...rest } = createPostDto;

  let tags = await this.tagService.findMultipleTags(
    createPostDto.tags ?? [],
  );
  const post = this.postsRepository.create({
    ...rest,
    author,
    tags: tags,
    ...(metaOptions ? { metaOptions } : {}),
  });

  return await this.postsRepository.save(post);

  }

  /**
   * Method to find all posts
   */
  public async findAll() {
    // find all posts
    let posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        // author: true,
        // tags: true,
      },
    });

    return posts;
  }

  public async update(patchPostDto: PatchPostDto) {

    let tags: Tag[] | undefined = undefined;
    let post: Post | null | undefined = undefined;

    try {
       tags = await this.tagService.findMultipleTags(patchPostDto.tags ?? []);

    } catch(error){
      throw new RequestTimeoutException(
        'There was an error while fetching tags',
        {
          description: 'Error connecting to the database or processing the request',  
    }
      );
    }

    if (!tags || tags.length !== (patchPostDto.tags?.length ?? 0)) {
      throw new BadRequestException('Tags not found');
    }
    try {
      post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });
    } catch (error) {
      throw new RequestTimeoutException(
        'There was an error while fetching the post',
        {
          description: 'Error connecting to the database or processing the request',
        }
      );
    }

    if (!post) {
      throw new NotFoundException(`Post with id ${patchPostDto.id} not found`);
    }
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    post.tags = tags;

    try {
      await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'There was an error while updating the post',
        {
          description: 'Error connecting to the database or processing the request',
        }
      );
    }
    return post;
  }

  /**
   * Method to delete a post from the database
   */
  public async delete(id: number) {
    // Find the post from the database
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }


}
