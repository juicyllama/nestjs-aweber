import { AuthModule } from '../auth/auth.module'
import { ListsService } from './lists.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [AuthModule],
	providers: [ListsService],
	exports: [ListsService],
})
export class ListsModule {}
