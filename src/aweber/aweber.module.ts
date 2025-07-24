
import { Module } from "@nestjs/common";
import { CacheModule } from '@nestjs/cache-manager'
import { AuthModule } from "./auth/auth.module";
import { WebhookController } from "./aweber.webhooks.controller";
import { LocalCacheModule } from "../config/cache/local.cache.module";
import { AWeberConfigDto } from "../config/config.dto";
import { ConfigValidationModule } from "../config/config.module";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigValidationModule.register(AWeberConfigDto),
    AuthModule,
    LocalCacheModule,
  ],
  controllers: [WebhookController],
  providers: [],
  exports: [],
})
export class AWeberModule {}