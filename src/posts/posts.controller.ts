import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    /*
     *  Injecting Posts Service
     */
    private readonly postsService: PostsService,
  ) {}

  /*
   * GET localhost:3000/posts/:userId
   */
  @Get(':userId')
public getPosts(
  @Query() postQuery: GetPostsDto,
  @Query('userId') userId: string
) {
  return this.postsService.findAll(postQuery, userId);
}

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
  })
  @Post()
  // public createPost(@Body() createPostDto: CreatePostDto) {
  public createPost(@Req() reqeust) {
    console.log(reqeust[REQUEST_USER_KEY]);
    // return this.postsService.update(patchPostsDto);
  }

  @ApiOperation({
    summary: 'Updates an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'A 200 response if the post is updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostsDto: PatchPostDto) {
    console.log(patchPostsDto);
    return this.postsService.update(patchPostsDto);
  }

  /**
   * Route to delete a post
   */
  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
