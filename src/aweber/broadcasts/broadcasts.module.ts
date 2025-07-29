import { AuthModule } from '../auth/auth.module'
import { BroadcastsService } from './broadcasts.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [AuthModule],
	controllers: [],
	providers: [BroadcastsService],
	exports: [BroadcastsService],
})
export class BroadcastsModule {}
