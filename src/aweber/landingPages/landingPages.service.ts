import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import { AWeberLandingPageQuery } from './landingPages.dto'
import { landingPageMock } from './landingPages.mocks'
import { AWeberLandingPage } from './landingPages.types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LandingPagesService {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Get landing pages for a specific list
	 */
	async getLandingPages(
		accountId: number,
		listId: number,
		params?: AWeberLandingPageQuery,
	): Promise<AWeberLandingPage[]> {
		if (process.env.NODE_ENV === 'test') {
			return [landingPageMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/landing_pages`
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
			throw new Error(`Get Landing Pages API Call failed: ${response.status} - ${errorText}`)
		}

		const responseData = (await response.json()) as { entries: AWeberLandingPage[] }
		return responseData.entries || [] // Ensure we return an array, even if empty
	}

	/**
	 * Get a specific landing page by ID
	 */
	async getLandingPage(accountId: number, listId: number, landingPageId: string): Promise<AWeberLandingPage> {
		if (process.env.NODE_ENV === 'test') {
			return landingPageMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/landing_pages/${landingPageId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		)

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Get Landing Page API Call failed: ${response.status} - ${errorText}`)
		}

		return (await response.json()) as AWeberLandingPage
	}
}
