import { AuthModule } from '../auth/auth.module'
import { SubscribersService } from './subscribers.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [AuthModule],
	providers: [SubscribersService],
	exports: [SubscribersService],
})
export class SubscribersModule {}
