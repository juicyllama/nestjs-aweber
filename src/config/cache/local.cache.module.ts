import Redis from 'ioredis'
import { Module } from '@nestjs/common'
import { ConfigValidationModule } from "../config.module";
import { CacheConfigDto } from './cache.dto';
import { LocalCacheService } from "./local.cache.service";
import { REDIS_CACHE_TOKEN } from './cache.constants';

function createRedisCache() {
	if (process.env.REDIS_PORT && process.env.REDIS_HOST) {
		return new Redis(+process.env.REDIS_PORT, process.env.REDIS_HOST, {
			username: process.env.REDIS_USER ?? undefined,
			password: process.env.REDIS_PASS ?? undefined,
			db: process.env.REDIS_DB ? Number(process.env.REDIS_DB) : 0,
		})
	}
}

@Module({
	imports: [
		ConfigValidationModule.register(CacheConfigDto),
	],
	providers: [
		LocalCacheService,
		{
			provide: REDIS_CACHE_TOKEN,
			useFactory: createRedisCache,
		},
	],
	exports: [LocalCacheService],
})
export class LocalCacheModule {}
