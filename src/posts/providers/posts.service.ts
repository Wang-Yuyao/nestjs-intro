import { CreatePostDto } from '../dtos/create-post.dto';
import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import {Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
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
    let tags = await this.tagService.findMultipleTags(patchPostDto.tags ?? []);
    let post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });
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

    return await this.postsRepository.save(post);
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
