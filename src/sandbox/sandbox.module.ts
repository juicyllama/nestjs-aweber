import { AccountsModule } from '../aweber/accounts/accounts.module'
import { AuthModule } from '../aweber/auth/auth.module'
import { AWeberModule } from '../index'
import { SandboxController } from './sandbox.controller'
import { SandboxService } from './sandbox.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [ConfigModule.forRoot(), AWeberModule, AuthModule, AccountsModule],
	controllers: [SandboxController],
	providers: [SandboxService],
	exports: [SandboxService],
})
export class SandboxModule {}
