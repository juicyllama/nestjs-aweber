import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import {
	AWeberGetSubscribersDto,
	AWeberCreateSubscriberDto,
	AWeberUpdateSubscriberDto,
	AWeberGetSubscriberActivityDto,
	AWeberMoveSubscriberDto,
	AWeberCreatePurchaseDto,
	AWeberUpdateSubscriberByEmailDto,
	AWeberFindSubscribersDto,
} from './subscribers.dto'
import {
	subscriberMock,
	subscriberActivityMock,
	createSubscriberMock,
	moveSubscriberMock,
	createPurchaseMock,
} from './subscribers.mocks'
import {
	AWeberSubscriber,
	AWeberSubscriberActivity,
	AWeberSubscriberTotal,
	AWeberMoveSubscriberResponse,
	AWeberCreatePurchaseResponse,
} from './subscribers.types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SubscribersService {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Get subscribers for a specific list
	 */
	async getSubscribers(
		accountId: number,
		listId: number,
		params?: AWeberGetSubscribersDto,
	): Promise<AWeberSubscriber[]> {
		if (process.env.NODE_ENV === 'test') {
			return [subscriberMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers`
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

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Get Subscribers API Call failed: ${response.status} - ${errorText}`)
		}

		const responseData = (await response.json()) as { entries: AWeberSubscriber[] }
		return responseData.entries || []
	}

	/**
	 * Get total number of subscribers (this method will be removed as it's not a direct API endpoint)
	 * @deprecated Use getSubscribers with ws.show=total_size parameter instead
	 */
	async getSubscribersTotal(
		accountId: number,
		listId: number,
		params?: AWeberGetSubscribersDto,
	): Promise<AWeberSubscriberTotal> {
		if (process.env.NODE_ENV === 'test') {
			return { total_size: 1 }
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers`
		if (params && Object.keys(params).length > 0) {
			url += '?' + new URLSearchParams(params as unknown as Record<string, string>).toString()
		}
		url += (url.includes('?') ? '&' : '?') + 'ws.show=total_size'

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Get Subscribers Total API Call failed: ${response.status} - ${errorText}`)
		}

		const responseData = (await response.json()) as AWeberSubscriberTotal
		return responseData
	}

	/**
	 * Get a specific subscriber by ID
	 */
	async getSubscriber(accountId: number, listId: number, subscriberId: number): Promise<AWeberSubscriber> {
		if (process.env.NODE_ENV === 'test') {
			return subscriberMock
		}

		const accessToken = await this.authService.accessToken()

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers/${subscriberId}`

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Get Subscriber API Call failed: ${response.status} - ${errorText}`)
		}

		return (await response.json()) as AWeberSubscriber
	}

	/**
	 * Create a new subscriber
	 */
	async createSubscriber(
		accountId: number,
		listId: number,
		data: AWeberCreateSubscriberDto,
	): Promise<AWeberSubscriber> {
		if (process.env.NODE_ENV === 'test') {
			return createSubscriberMock
		}

		const accessToken = await this.authService.accessToken()

		const formData = new URLSearchParams()
		formData.append('email', data.email)

		if (data.name) formData.append('name', data.name)
		if (data.custom_fields) {
			formData.append('custom_fields', JSON.stringify(data.custom_fields))
		}
		if (data.tags && data.tags.length > 0) {
			formData.append('tags', JSON.stringify(data.tags))
		}
		if (data.ad_tracking) formData.append('ad_tracking', data.ad_tracking)
		if (data.last_followup_message_number_sent) {
			formData.append('last_followup_message_number_sent', data.last_followup_message_number_sent)
		}
		if (data.ip_address) formData.append('ip_address', data.ip_address)
		if (data.misc_notes) formData.append('misc_notes', data.misc_notes)
		if (data.strict_custom_fields) formData.append('strict_custom_fields', data.strict_custom_fields)
		if (data.update_existing) formData.append('update_existing', data.update_existing)

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers`

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData,
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Create Subscriber API Call failed: ${response.status} - ${errorText}`)
		}

		return (await response.json()) as AWeberSubscriber
	}

	/**
	 * Update a subscriber by ID
	 */
	async updateSubscriberById(
		accountId: number,
		listId: number,
		subscriberId: number,
		data: AWeberUpdateSubscriberDto,
	): Promise<AWeberSubscriber> {
		if (process.env.NODE_ENV === 'test') {
			return {
				...subscriberMock,
				...data,
				tags: Array.isArray(data.tags) ? data.tags : subscriberMock.tags,
			}
		}

		const accessToken = await this.authService.accessToken()

		const formData = new URLSearchParams()

		if (data.name) formData.append('name', data.name)
		if (data.custom_fields) {
			formData.append('custom_fields', JSON.stringify(data.custom_fields))
		}
		if (data.tags && data.tags.length > 0) {
			formData.append('tags', JSON.stringify(data.tags))
		}
		if (data.ad_tracking) formData.append('ad_tracking', data.ad_tracking)
		if (data.misc_notes) formData.append('misc_notes', data.misc_notes)

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers/${subscriberId}`

		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData,
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Update Subscriber API Call failed: ${response.status} - ${errorText}`)
		}

		return (await response.json()) as AWeberSubscriber
	}

	/**
	 * Delete a subscriber by ID
	 */
	async deleteSubscriberById(accountId: number, listId: number, subscriberId: number): Promise<void> {
		if (process.env.NODE_ENV === 'test') {
			return
		}

		const accessToken = await this.authService.accessToken()

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers/${subscriberId}`

		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Delete Subscriber API Call failed: ${response.status} - ${errorText}`)
		}
	}

	/**
	 * Get subscriber activity
	 */
	async getSubscriberActivity(
		accountId: number,
		listId: number,
		subscriberId: number,
		params?: AWeberGetSubscriberActivityDto,
	): Promise<AWeberSubscriberActivity[]> {
		if (process.env.NODE_ENV === 'test') {
			return [subscriberActivityMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers/${subscriberId}/activity`
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

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Get Subscriber Activity API Call failed: ${response.status} - ${errorText}`)
		}

		const responseData = (await response.json()) as { entries: AWeberSubscriberActivity[] }
		return responseData.entries || []
	}

	/**
	 * Move subscriber to another list
	 */
	async moveSubscriber(
		accountId: number,
		listId: number,
		subscriberId: number,
		data: AWeberMoveSubscriberDto,
	): Promise<AWeberMoveSubscriberResponse> {
		if (process.env.NODE_ENV === 'test') {
			return moveSubscriberMock
		}

		const accessToken = await this.authService.accessToken()

		const formData = new URLSearchParams()
		formData.append('list_id', data.list_id.toString())

		if (data.last_followup_message_number_sent) {
			formData.append('last_followup_message_number_sent', data.last_followup_message_number_sent)
		}

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers/${subscriberId}/move`

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData,
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Move Subscriber API Call failed: ${response.status} - ${errorText}`)
		}

		return (await response.json()) as AWeberMoveSubscriberResponse
	}

	/**
	 * Create a purchase event for a subscriber
	 */
	async createPurchase(
		accountId: number,
		listId: number,
		subscriberId: number,
		data: AWeberCreatePurchaseDto,
	): Promise<AWeberCreatePurchaseResponse> {
		if (process.env.NODE_ENV === 'test') {
			return createPurchaseMock
		}

		const accessToken = await this.authService.accessToken()

		const formData = new URLSearchParams()
		formData.append('product_id', data.product_id)
		formData.append('price', data.price.toString())

		if (data.currency) formData.append('currency', data.currency)
		if (data.description) formData.append('description', data.description)
		if (data.occurred_at) formData.append('occurred_at', data.occurred_at)

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers/${subscriberId}/purchases`

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData,
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Create Purchase API Call failed: ${response.status} - ${errorText}`)
		}

		return (await response.json()) as AWeberCreatePurchaseResponse
	}

	/**
	 * Update subscriber by email
	 */
	async updateSubscriberByEmail(
		accountId: number,
		listId: number,
		subscriberEmail: string,
		data: AWeberUpdateSubscriberByEmailDto,
	): Promise<AWeberSubscriber> {
		if (process.env.NODE_ENV === 'test') {
			return {
				...subscriberMock,
				...data,
				tags: Array.isArray(data.tags) ? data.tags : subscriberMock.tags,
			}
		}

		const accessToken = await this.authService.accessToken()

		const formData = new URLSearchParams()

		if (data.name) formData.append('name', data.name)
		if (data.custom_fields) {
			formData.append('custom_fields', JSON.stringify(data.custom_fields))
		}
		if (data.tags) {
			formData.append('tags', JSON.stringify(data.tags))
		}
		if (data.ad_tracking) formData.append('ad_tracking', data.ad_tracking)
		if (data.misc_notes) formData.append('misc_notes', data.misc_notes)
		if (data.email) formData.append('email', data.email)
		if (data.status) formData.append('status', data.status)
		if (data.strict_custom_fields) formData.append('strict_custom_fields', data.strict_custom_fields)
		if (data.last_followup_message_number_sent !== undefined) {
			formData.append('last_followup_message_number_sent', data.last_followup_message_number_sent.toString())
		}

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers?subscriber_email=${encodeURIComponent(subscriberEmail)}`

		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData,
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Update Subscriber By Email API Call failed: ${response.status} - ${errorText}`)
		}

		return (await response.json()) as AWeberSubscriber
	}

	/**
	 * Delete subscriber by email
	 */
	async deleteSubscriberByEmail(accountId: number, listId: number, subscriberEmail: string): Promise<void> {
		if (process.env.NODE_ENV === 'test') {
			return
		}

		const accessToken = await this.authService.accessToken()

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers?subscriber_email=${encodeURIComponent(subscriberEmail)}`

		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Delete Subscriber By Email API Call failed: ${response.status} - ${errorText}`)
		}
	}

	/**
	 * Find subscribers for list
	 */
	async findSubscribersForList(
		accountId: number,
		listId: number,
		params?: AWeberFindSubscribersDto,
	): Promise<AWeberSubscriber[]> {
		if (process.env.NODE_ENV === 'test') {
			return [subscriberMock]
		}

		const accessToken = await this.authService.accessToken()

		const queryParams = new URLSearchParams({ 'ws.op': 'find' })
		if (params && Object.keys(params).length > 0) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					queryParams.append(key, String(value))
				}
			})
		}

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/subscribers?${queryParams.toString()}`

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Find Subscribers For List API Call failed: ${response.status} - ${errorText}`)
		}

		const responseData = (await response.json()) as { entries: AWeberSubscriber[] }
		return responseData.entries || []
	}

	/**
	 * Find subscribers for account
	 */
	async findSubscribersForAccount(accountId: number, params?: AWeberFindSubscribersDto): Promise<AWeberSubscriber[]> {
		if (process.env.NODE_ENV === 'test') {
			return [subscriberMock]
		}

		const accessToken = await this.authService.accessToken()

		const queryParams = new URLSearchParams({ 'ws.op': 'findSubscribers' })
		if (params && Object.keys(params).length > 0) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					queryParams.append(key, String(value))
				}
			})
		}

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}?${queryParams.toString()}`

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Find Subscribers For Account API Call failed: ${response.status} - ${errorText}`)
		}

		const responseData = (await response.json()) as { entries: AWeberSubscriber[] }
		return responseData.entries || []
	}
}
