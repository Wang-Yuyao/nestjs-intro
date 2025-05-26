import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dto/create-post-meta-options.dto';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-options.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {

  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>
  ) {}

  public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {

    let metaOption = this.metaOptionsRepository.create(createPostMetaOptionsDto,);
    return await this.metaOptionsRepository.save(metaOption);

  };
}
