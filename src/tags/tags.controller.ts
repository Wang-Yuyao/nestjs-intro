import { Body, Controller, Post } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {

  constructor(

    private readonly tagsService: TagsService, // Assuming you have a TagsService to handle business logic
    // If you have a TagsService, inject it here
  ) {
    // Initialize any dependencies or services here if needed
  }

  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }
}
