import { IsNotEmpty, IsString } from 'class-validator'

export class AWeberConfigDto {
	@IsNotEmpty()
	@IsString()
	AWEBER_CLIENT_ID!: string

	@IsNotEmpty()
	@IsString()
	AWEBER_CLIENT_SECRET!: string
}