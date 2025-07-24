import { IsString } from "class-validator";

export class AWeberConfigDto {
  @IsString()
  AWEBER_CLIENT_ID!: string;

  @IsString()
  AWEBER_CLIENT_SECRET!: string;
}
