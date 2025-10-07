import { REDIS_CACHE_TOKEN } from './cache.constants'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'
import Redis from 'ioredis'

@Injectable()
export class LocalCacheService implements OnApplicationShutdown {
	constructor(
		@Inject(REDIS_CACHE_TOKEN) private readonly redis: Redis,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private readonly configService: ConfigService,
	) {}

	onApplicationShutdown() {
		if (this.useRedis()) {
			this.redis.disconnect()
		}
	}

	public useRedis(): boolean {
		const redisUri = this.configService.get<string>('REDIS_URI')
		return !!redisUri
	}

	/**
	 * Read from cache
	 * * Will use Redis if available
	 * * otherwise will use in-memory cache
	 */

	public async read(key: string): Promise<unknown> {
		if (this.useRedis()) {
			if (this.redis.status !== 'ready') {
				throw new Error('Redis client not ready')
			}

			const value = await this.redis.get(key)
			return value ? JSON.parse(value) : undefined
		} else {
			return await this.cacheManager.get(key)
		}
	}

	/**
	 * Write to cache
	 * * Will use Redis if available
	 * * otherwise will use in-memory cache
	 */

	public async write(key: string, value: any, ttl?: number): Promise<void> {
		if (this.useRedis()) {
			if (this.redis.status !== 'ready') {
				throw new Error('Redis client not ready')
			}

			if (!ttl || ttl <= 0) {
				await this.redis.set(key, JSON.stringify(value))
			} else {
				await this.redis.set(key, JSON.stringify(value), 'PX', ttl)
			}
		} else {
			await this.cacheManager.set(key, value, ttl)
		}
	}

	/**
	 * Delete from cache
	 * * Will use Redis if available
	 * * otherwise will use in-memory cache
	 */

	public async del(key: string): Promise<void> {
		if (this.useRedis()) {
			if (this.redis.status !== 'ready') {
				throw new Error('Redis client not ready')
			}
			await this.redis.del(key)
		} else {
			await this.cacheManager.del(key)
		}
	}
}
