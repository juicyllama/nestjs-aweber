import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class GetAccountsQuery {
  
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value.toString())
  'ws.start'?: string; //The pagination starting offset - defaults to 0

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value.toString())
  'ws.size'?: string; //The pagination total entries to retrieve - defaults to 100

}

export class Account {

  @IsNumber()
  id!: number; //The unique identifier for the account

  @IsUUID()
  uuid!: string; //The universally unique identifier for the account

  @IsString()
  company!: string; //The name of the account  

}