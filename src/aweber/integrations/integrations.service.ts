import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import { safeJsonParse } from '../utils/response.utils'
import { AWeberIntegrationsQuery } from './integrations.dto'
import { integrationMock } from './integrations.mocks'
import { AWeberIntegration } from './integrations.types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class IntegrationsService {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Get integrations for a specific account
	 */
	async getIntegrations(accountId: number, params?: AWeberIntegrationsQuery): Promise<AWeberIntegration[]> {
		if (process.env.NODE_ENV === 'test') {
			return [integrationMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/integrations`
		if (params && Object.keys(params).length > 0) {
			url += '?' + new URLSearchParams(params as unknown as Record<string, string>).toString()
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})

		const responseData = await safeJsonParse<{ entries: AWeberIntegration[] }>(response, 'API Call')
		return responseData.entries || [] // Ensure we return an array, even if empty
	}

	/**
	 * Get a specific integration by ID
	 */
	async getIntegration(accountId: number, integrationId: number): Promise<AWeberIntegration> {
		if (process.env.NODE_ENV === 'test') {
			return integrationMock
		}

		const accessToken = await this.authService.accessToken()

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/integrations/${integrationId}`

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})

		const data = await safeJsonParse<AWeberIntegration>(response, 'API Call')
		return data
	}
}
