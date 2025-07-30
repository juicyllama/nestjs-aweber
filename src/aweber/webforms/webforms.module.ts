import { AuthModule } from '../auth/auth.module'
import { WebformsService } from './webforms.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [AuthModule],
	controllers: [],
	providers: [WebformsService],
	exports: [WebformsService],
})
export class WebformsModule {}
