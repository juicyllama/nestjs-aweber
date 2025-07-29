import { AuthModule } from '../auth/auth.module'
import { CampaignsService } from './campaigns.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [AuthModule],
	controllers: [],
	providers: [CampaignsService],
	exports: [CampaignsService],
})
export class CampaignsModule {}
