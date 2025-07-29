import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import {
	AWeberBroadcastQuery,
	AWeberBroadcastTotalQuery,
	AWeberCreateBroadcastDto,
	AWeberUpdateBroadcastDto,
	AWeberScheduleBroadcastDto,
	AWeberBroadcastOpensQuery,
	AWeberBroadcastClicksQuery,
} from './broadcasts.dto'
import {
	broadcastMock,
	broadcastTotalMock,
	scheduleBroadcastMock,
	cancelBroadcastMock,
	broadcastClickMock,
	broadcastOpenMock,
} from './broadcasts.mocks'
import {
	AWeberBroadcast,
	AWeberBroadcastTotal,
	AWeberBroadcastScheduleResponse,
	AWeberBroadcastCancelResponse,
	AWeberBroadcastOpen,
	AWeberBroadcastClick,
} from './broadcasts.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class BroadcastsService {
	private readonly logger = new Logger(BroadcastsService.name)

	constructor(private readonly authService: AuthService) {}

	/**
	 * Get broadcasts for a specific list
	 */
	async getBroadcasts(accountId: number, listId: number, params: AWeberBroadcastQuery): Promise<AWeberBroadcast[]> {
		if (process.env.NODE_ENV === 'test') {
			return [broadcastMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/broadcasts`
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
			this.logger.error(`Get Broadcasts API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Get Broadcasts API Call failed: ${response.status}`)
		}

		const responseData = (await response.json()) as { entries: AWeberBroadcast[] }
		return responseData.entries || [] // Ensure we return an array, even if empty
	}

	/**
	 * Create a new broadcast
	 */
	async createBroadcast(accountId: number, listId: number, data: AWeberCreateBroadcastDto): Promise<AWeberBroadcast> {
		if (process.env.NODE_ENV === 'test') {
			return broadcastMock
		}

		const accessToken = await this.authService.accessToken()

		// Convert arrays to JSON strings for form data
		const formData = new URLSearchParams()
		Object.entries(data).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				formData.append(key, JSON.stringify(value))
			} else if (value !== undefined && value !== null) {
				formData.append(key, String(value))
			}
		})

		const response = await fetch(`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/broadcasts`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData.toString(),
		})

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Create Broadcast API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Create Broadcast API Call failed: ${response.status}`)
		}

		return (await response.json()) as AWeberBroadcast
	}

	/**
	 * Get a specific broadcast
	 */
	async getBroadcast(accountId: number, listId: number, broadcastId: number): Promise<AWeberBroadcast> {
		if (process.env.NODE_ENV === 'test') {
			return broadcastMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/broadcasts/${broadcastId}`,
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
			this.logger.error(`Get Broadcast API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Get Broadcast API Call failed: ${response.status}`)
		}

		return (await response.json()) as AWeberBroadcast
	}

	/**
	 * Update a broadcast
	 */
	async updateBroadcast(
		accountId: number,
		listId: number,
		broadcastId: number,
		data: AWeberUpdateBroadcastDto,
	): Promise<AWeberBroadcast> {
		if (process.env.NODE_ENV === 'test') {
			return broadcastMock
		}

		const accessToken = await this.authService.accessToken()

		// Convert arrays to JSON strings for form data
		const formData = new URLSearchParams()
		Object.entries(data).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				formData.append(key, JSON.stringify(value))
			} else if (value !== undefined && value !== null) {
				formData.append(key, String(value))
			}
		})

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/broadcasts/${broadcastId}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: formData.toString(),
			},
		)

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Update Broadcast API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Update Broadcast API Call failed: ${response.status}`)
		}

		return (await response.json()) as AWeberBroadcast
	}

	/**
	 * Delete a broadcast
	 */
	async deleteBroadcast(accountId: number, listId: number, broadcastId: number): Promise<void> {
		if (process.env.NODE_ENV === 'test') {
			return
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/broadcasts/${broadcastId}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		)

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Delete Broadcast API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Delete Broadcast API Call failed: ${response.status}`)
		}
	}

	/**
	 * Schedule a broadcast
	 */
	async scheduleBroadcast(
		accountId: number,
		listId: number,
		broadcastId: number,
		data: AWeberScheduleBroadcastDto,
	): Promise<AWeberBroadcastScheduleResponse> {
		if (process.env.NODE_ENV === 'test') {
			return scheduleBroadcastMock
		}

		const accessToken = await this.authService.accessToken()

		const formData = new URLSearchParams()
		formData.append('scheduled_for', data.scheduled_for)

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/broadcasts/${broadcastId}/schedule`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: formData.toString(),
			},
		)

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Schedule Broadcast API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Schedule Broadcast API Call failed: ${response.status}`)
		}

		return (await response.json()) as AWeberBroadcastScheduleResponse
	}

	/**
	 * Cancel a scheduled broadcast
	 */
	async cancelBroadcast(
		accountId: number,
		listId: number,
		broadcastId: number,
	): Promise<AWeberBroadcastCancelResponse> {
		if (process.env.NODE_ENV === 'test') {
			return cancelBroadcastMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/broadcasts/${broadcastId}/cancel`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		)

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Cancel Broadcast API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Cancel Broadcast API Call failed: ${response.status}`)
		}

		return (await response.json()) as AWeberBroadcastCancelResponse
	}

	/**
	 * Get total broadcasts by status
	 */
	async getTotalBroadcasts(
		accountId: number,
		listId: number,
		params: AWeberBroadcastTotalQuery,
	): Promise<AWeberBroadcastTotal> {
		if (process.env.NODE_ENV === 'test') {
			return broadcastTotalMock
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/broadcasts/total`
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
			this.logger.error(`Get Total Broadcasts API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Get Total Broadcasts API Call failed: ${response.status}`)
		}

		return (await response.json()) as AWeberBroadcastTotal
	}

	/**
	 * Get broadcast opens
	 */
	async getBroadcastOpens(
		accountId: number,
		listId: number,
		broadcastId: number,
		params?: AWeberBroadcastOpensQuery,
	): Promise<AWeberBroadcastOpen[]> {
		if (process.env.NODE_ENV === 'test') {
			return [broadcastOpenMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/broadcasts/${broadcastId}/opens`
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

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Get Broadcast Opens API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Get Broadcast Opens API Call failed: ${response.status}`)
		}

		const responseData = (await response.json()) as { entries: AWeberBroadcastOpen[] }
		return responseData.entries || []
	}

	/**
	 * Get broadcast clicks
	 */
	async getBroadcastClicks(
		accountId: number,
		listId: number,
		broadcastId: number,
		params?: AWeberBroadcastClicksQuery,
	): Promise<AWeberBroadcastClick[]> {
		if (process.env.NODE_ENV === 'test') {
			return [broadcastClickMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/broadcasts/${broadcastId}/clicks`
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

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Get Broadcast Clicks API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Get Broadcast Clicks API Call failed: ${response.status}`)
		}

		const responseData = (await response.json()) as { entries: AWeberBroadcastClick[] }
		return responseData.entries || []
	}
}
