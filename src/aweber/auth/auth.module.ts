import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { AWeberConfigDto } from '../../config/config.dto'
import { ConfigValidationModule } from "../../config/config.module";
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller';
import { LocalCacheModule } from '../../config/cache/local.cache.module';

@Module({
	imports: [
		ConfigValidationModule.register(AWeberConfigDto), 
		CacheModule.register(),
		LocalCacheModule,
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
