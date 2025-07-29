import { AuthModule } from '../auth/auth.module'
import { CustomFieldsService } from './customFields.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [AuthModule],
	controllers: [],
	providers: [CustomFieldsService],
	exports: [CustomFieldsService],
})
export class CustomFieldsModule {}
