import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {

  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
