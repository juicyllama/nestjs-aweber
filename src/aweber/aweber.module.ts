import { LocalCacheModule } from '../config/cache/local.cache.module'
import { AWeberConfigDto } from '../config/config.dto'
import { ConfigValidationModule } from '../config/config.module'
import { AccountsModule } from './accounts/accounts.module'
import { AuthModule } from './auth/auth.module'
import { BroadcastsModule } from './broadcasts/broadcasts.module'
import { CampaignsModule } from './campaigns/campaigns.module'
import { CustomFieldsModule } from './customFields/customFields.module'
import { IntegrationsModule } from './integrations/integrations.module'
import { LandingPagesModule } from './landingPages/landingPages.module'
import { ListsModule } from './lists/lists.module'
import { SegmentsModule } from './segments/segments.module'
import { SubscribersModule } from './subscribers/subscribers.module'
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
		BroadcastsModule,
		CampaignsModule,
		CustomFieldsModule,
		IntegrationsModule,
		LandingPagesModule,
		ListsModule,
		SegmentsModule,
		SubscribersModule,
	],
})
export class AWeberModule {}
