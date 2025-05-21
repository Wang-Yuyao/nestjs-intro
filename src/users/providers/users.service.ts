import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamsDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";

/**
 * Class to connect to Users table and perform bussiness operations
 */
@Injectable()
export class UsersService{

/**
 * constructor
 * @param authService 
 */
  constructor(
    @Inject(forwardRef(()=> AuthService))
    private readonly authService: AuthService
  ){}


  /**
   * findAll users
   * @param getUsersParamsDto 
   * @param limit 
   * @param page 
   * @returns usersInfo
   */
  public findAll(getUsersParamsDto: GetUsersParamsDto, limit: number, page: number,) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
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
   * findUsersById
   * @param id 
   * @returns usersInfo
   */
  public findOneById (id: string) { 
    return {
        firstName: "Wang",
        email: "wang.gooogle@com"
    }
  }
}
