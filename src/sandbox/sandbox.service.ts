import { Injectable, Logger, Req } from '@nestjs/common'
import { AccountsService } from '../aweber/accounts/accounts.service';
import { AuthService } from '../aweber/auth/auth.service';

@Injectable()
export class SandboxService {
	private readonly logger = new Logger(SandboxService.name)

	constructor(
		private readonly accountService: AccountsService,
		private readonly authService: AuthService,
	) {}

	async run(@Req() req: any): Promise<any> {

		this.logger.log('Running sandbox service...');
		const accessToken = await this.authService.accessToken()
		this.logger.log('Access Token:', accessToken);

		const accounts = await this.accountService.getAccounts();
		this.logger.log('Fetched accounts:', accounts);

		const account = await this.accountService.getAccount(2334217);
		this.logger.log('Fetched account:', account);

		return { message: 'Sandbox service is running' };

	}


}
