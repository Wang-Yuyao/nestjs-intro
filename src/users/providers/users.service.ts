import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamsDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";

@Injectable()
export class UsersService{

  constructor(
    @Inject(forwardRef(()=> AuthService))
    private readonly authService: AuthService
  ){}

  /**
   * findAll
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
   * findOneById
  id: number   */
  public findOneById (id: string) { 
    return {
        firstName: "Wang",
        email: "wang.gooogle@com"
    }
  }
}
