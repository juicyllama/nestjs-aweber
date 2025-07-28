import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module';
import { AccountsService } from './accounts.service';

@Module({
	imports: [AuthModule],
	controllers: [],
	providers: [AccountsService],
	exports: [AccountsService],
})
export class AccountsModule {}
