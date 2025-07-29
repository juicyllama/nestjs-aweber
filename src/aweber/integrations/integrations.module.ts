import { AuthModule } from '../auth/auth.module'
import { IntegrationsService } from './integrations.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [AuthModule],
	controllers: [],
	providers: [IntegrationsService],
	exports: [IntegrationsService],
})
export class IntegrationsModule {}
