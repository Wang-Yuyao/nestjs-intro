import { Injectable } from "@nestjs/common";
import { GetUsersParamsDto } from "../dtos/get-users-param.dto";

@Injectable()
export class UsersService{
  /**
   * findAll
   */
  public findAll(getUsersParamsDto: GetUsersParamsDto, limit: number, page: number,) {
    return [
      {
        firstName: "Wang",
        email: "wang.gooogle@com"
      },
      {
        firstName: "CUi",
        email: "cui.gooogle@com"
      },
    ]
  }

  /**
   * findOneById
id: number   */
  public findOneById (id: number) { 
    return {
        firstName: "Wang",
        email: "wang.gooogle@com"
    }
  }
}
