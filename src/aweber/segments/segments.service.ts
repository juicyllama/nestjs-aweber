import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import { safeJsonParse } from '../utils/response.utils'
import { AWeberSegmentsQuery } from './segments.dto'
import { segmentMock, segmentsMock } from './segments.mocks'
import { AWeberSegment } from './segments.types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SegmentsService {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Get segments for a specific list
	 */
	async getSegments(accountId: number, listId: number, params?: AWeberSegmentsQuery): Promise<AWeberSegment[]> {
		if (process.env.NODE_ENV === 'test') {
			return segmentsMock
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/segments`
		if (params && Object.keys(params).length > 0) {
			url += '?' + new URLSearchParams(params as unknown as Record<string, string>).toString()
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		const responseData = await safeJsonParse<{ entries: AWeberSegment[] }>(response, 'API Call')
		return responseData.entries || [] // Ensure we return an array, even if empty
	}

	/**
	 * Get a specific segment by ID
	 */
	async getSegment(accountId: number, listId: number, segmentId: number): Promise<AWeberSegment> {
		if (process.env.NODE_ENV === 'test') {
			return segmentMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/segments/${segmentId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			},
		)

		return await safeJsonParse<AWeberSegment>(response, 'API Call')
	}
}
