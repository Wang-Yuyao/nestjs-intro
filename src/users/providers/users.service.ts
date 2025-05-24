import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamsDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { Repository } from "typeorm";
import { User } from "../users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";

/**
 * Class to connect to Users table and perform bussiness operations
 */
@Injectable()
export class UsersService{

/**
 * constructor
 */
  constructor(
    @InjectRepository(User)
    private usersRespository: Repository<User>
  ){}


  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRespository.findOne({
      where: { email: createUserDto.email },
    });

    let newUser = this.usersRespository.create(createUserDto);
    newUser = await this.usersRespository.save(newUser);
    return newUser;
  }


  // /**
  //  * findAll users
  //  * @param getUsersParamsDto 
  //  * @param limit 
  //  * @param page 
  //  * @returns usersInfo
  //  */
  // public findAll(getUsersParamsDto: GetUsersParamsDto, limit: number, page: number,) {
  //   const isAuth = this.authService.isAuth();
  //   console.log(isAuth);
  //   return [
  //     {
  //       firstName: "Wang",
  //       email: "wang.gooogle@com"
  //     },
  //     {
  //       firstName: "CUi",
  //       email: "cui.gooogle@com"
  //     },
  //   ]
  // }

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
