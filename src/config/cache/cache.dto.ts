import { IsOptional, IsString } from 'class-validator'

export class CacheConfigDto {
	@IsString()
	@IsOptional()
	REDIS_URI?: string
}
