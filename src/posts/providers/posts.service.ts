import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  /**
   * findAll
userId: string   */
  public findAll(userId: string) {
    console.log("find all")
  }
}
