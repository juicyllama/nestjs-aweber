import { AuthModule } from '../auth/auth.module'
import { LandingPagesService } from './landingPages.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [AuthModule],
	providers: [LandingPagesService],
	exports: [LandingPagesService],
})
export class LandingPagesModule {}
