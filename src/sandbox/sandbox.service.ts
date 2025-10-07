import { AccountsService } from '../aweber/accounts/accounts.service'
import { AuthService } from '../aweber/auth/auth.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SandboxService {
	private readonly logger = new Logger(SandboxService.name)

	constructor(
		private readonly accountService: AccountsService,
		private readonly authService: AuthService,
	) {}

	async run(): Promise<{ message: string }> {
		this.logger.log('Running sandbox service...')

		const accessToken = await this.authService.accessToken()
		this.logger.log('Access Token:', accessToken)

		const accounts = await this.accountService.getAccounts()
		this.logger.log('Fetched accounts:', accounts)

		return { message: 'Sandbox service is running' }
	}
}
