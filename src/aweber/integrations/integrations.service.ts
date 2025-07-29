import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import { AWeberIntegrationsQuery } from './integrations.dto'
import { integrationMock } from './integrations.mocks'
import { AWeberIntegration } from './integrations.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class IntegrationsService {
	private readonly logger = new Logger(IntegrationsService.name)

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

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Failed to get integrations: ${response.status} ${response.statusText} - ${errorText}`)
			throw new Error(`Failed to get integrations: ${response.status} ${response.statusText}`)
		}

		const responseData = (await response.json()) as { entries: AWeberIntegration[] }
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

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Failed to get integration: ${response.status} ${response.statusText} - ${errorText}`)
			throw new Error(`Failed to get integration: ${response.status} ${response.statusText}`)
		}

		const data = (await response.json()) as AWeberIntegration
		this.logger.log(`Successfully retrieved integration ${integrationId} for account ${accountId}`)

		return data
	}
}
