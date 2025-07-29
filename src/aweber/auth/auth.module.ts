import { LocalCacheModule } from '../../config/cache/local.cache.module'
import { AWeberConfigDto } from '../../config/config.dto'
import { ConfigValidationModule } from '../../config/config.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(AWeberConfigDto), CacheModule.register(), LocalCacheModule],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
