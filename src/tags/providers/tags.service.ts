import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>, // Replace with actual repository type
  ) {

  }
    // Initialize any dependencies or services here if needed

  public async createTag(createTagDto: CreateTagDto){
    let tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

public async findMultipleTags(tags: number[]) {
  let results = this.tagRepository.find({
    where: {
      id: In(tags),
    },
  });
  return results;
  }


  public async delete(id: number) {
     await this.tagRepository.delete(id);

     return { deleted: true,
        id,
      };
  }

  public async softRemove(id: number) {
   await this.tagRepository.softDelete( id );
        return { deleted: true,
        id,
      };
  }

}
