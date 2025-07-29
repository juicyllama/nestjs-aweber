import { AuthModule } from '../auth/auth.module'
import { SegmentsService } from './segments.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [AuthModule],
	providers: [SegmentsService],
	exports: [SegmentsService],
})
export class SegmentsModule {}
