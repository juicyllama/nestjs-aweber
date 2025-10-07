import { AccountsModule } from '../aweber/accounts/accounts.module'
import { AuthModule } from '../aweber/auth/auth.module'
import { AWeberModule } from '../index'
import { SandboxController } from './sandbox.controller'
import { SandboxService } from './sandbox.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [AWeberModule.forRoot(), AuthModule, AccountsModule],
	controllers: [SandboxController],
	providers: [SandboxService],
	exports: [SandboxService],
})
export class SandboxModule {}
