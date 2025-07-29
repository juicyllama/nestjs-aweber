import { LocalCacheModule } from '../config/cache/local.cache.module'
import { AWeberConfigDto } from '../config/config.dto'
import { ConfigValidationModule } from '../config/config.module'
import { AccountsModule } from './accounts/accounts.module'
import { AuthModule } from './auth/auth.module'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'

@Module({
	imports: [
		CacheModule.register({
			isGlobal: true,
		}),
		ConfigValidationModule.register(AWeberConfigDto),
		AuthModule,
		LocalCacheModule,
		AccountsModule,
	],
})
export class AWeberModule {}
