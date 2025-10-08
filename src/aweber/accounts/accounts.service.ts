import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import { safeJsonParse } from '../utils/response.utils'
import { AWeberAccountQuery } from './accounts.dto'
import { accountMock } from './accounts.mocks'
import { AWeberAccount } from './accounts.types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AccountsService {
	constructor(private readonly authService: AuthService) {}

	async getAccounts(params?: AWeberAccountQuery): Promise<AWeberAccount[]> {
		if (process.env.NODE_ENV === 'test') {
			// In test mode, return a mock account
			return [accountMock] as AWeberAccount[]
		}

		const accessToken = await this.authService.accessToken()

		let url = AWEBER_API_BASE_URL + '/accounts'
		if (params && Object.keys(params).length > 0) {
			url += '?' + new URLSearchParams(params as Record<string, string>).toString()
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})

		const responseData = await safeJsonParse<{ entries: AWeberAccount[] }>(response, 'API Call')
		return responseData.entries || [] // Ensure we return an array, even if empty
	}

	async getAccount(accountId: number): Promise<AWeberAccount> {
		if (process.env.NODE_ENV === 'test') {
			// In test mode, return a mock account
			return accountMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(AWEBER_API_BASE_URL + '/accounts/' + accountId, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})

		return await safeJsonParse<AWeberAccount>(response, 'API Call')
	}
}
