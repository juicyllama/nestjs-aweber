import { Injectable, Logger } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { Account, GetAccountsQuery } from './accounts.dto'
import { accountMock } from './accounts.mocks'

@Injectable()
export class AccountsService {
	private readonly logger = new Logger(AccountsService.name)

	constructor(
		private readonly authService: AuthService,
	) {}

	async getAccounts(params?: GetAccountsQuery): Promise<Account[]> {

		if(process.env.NODE_ENV === 'test') {
			// In test mode, return a mock account
			return [accountMock] as Account[]
		}


		const accessToken = await this.authService.accessToken()

		let url = AWEBER_API_BASE_URL + '/accounts';
		if (params && Object.keys(params).length > 0) {
			url += '?' + new URLSearchParams(params as Record<string, string>).toString();
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		})

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Get Accounts API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Get Accounts API Call failed: ${response.status}`)
		}

		const responseData = await response.json();
		return responseData.entries || []; // Ensure we return an array, even if empty
	}

	async getAccount(accountId: number): Promise<Account> {

		if(process.env.NODE_ENV === 'test') {
			// In test mode, return a mock account
			return accountMock as Account;
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(AWEBER_API_BASE_URL+'/accounts/' + accountId, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		})

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Get Account #${accountId} API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Get Account #${accountId} API Call failed: ${response.status}`)
		}

		return await response.json()
	}

}
