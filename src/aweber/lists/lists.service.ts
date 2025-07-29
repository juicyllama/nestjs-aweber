import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import { AWeberListQuery, AWeberFindListQuery } from './lists.dto'
import { listMock, listTagsMock } from './lists.mocks'
import { AWeberList, AWeberListTags } from './lists.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ListsService {
	private readonly logger = new Logger(ListsService.name)

	constructor(private readonly authService: AuthService) {}

	/**
	 * Get lists for a specific account
	 */
	async getLists(accountId: number, params?: AWeberListQuery): Promise<AWeberList[]> {
		if (process.env.NODE_ENV === 'test') {
			return [listMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists`
		if (params && Object.keys(params).length > 0) {
			url += '?' + new URLSearchParams(params as unknown as Record<string, string>).toString()
		}

		this.logger.debug(`Getting lists from: ${url}`)

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Failed to get lists: ${response.status} ${response.statusText} - ${errorText}`)
			throw new Error(`Failed to get lists: ${response.status} ${response.statusText}`)
		}

		const data = (await response.json()) as { entries?: AWeberList[] }
		return data.entries || []
	}

	/**
	 * Get a specific list by ID
	 */
	async getList(accountId: number, listId: number): Promise<AWeberList> {
		if (process.env.NODE_ENV === 'test') {
			return listMock
		}

		const accessToken = await this.authService.accessToken()

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}`

		this.logger.debug(`Getting list from: ${url}`)

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Failed to get list: ${response.status} ${response.statusText} - ${errorText}`)
			throw new Error(`Failed to get list: ${response.status} ${response.statusText}`)
		}

		return (await response.json()) as AWeberList
	}

	/**
	 * Find lists by name or unique list ID
	 */
	async findLists(accountId: number, params: AWeberFindListQuery): Promise<AWeberList[]> {
		if (process.env.NODE_ENV === 'test') {
			return [listMock]
		}

		const accessToken = await this.authService.accessToken()

		const url =
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists?` +
			new URLSearchParams(params as unknown as Record<string, string>).toString()

		this.logger.debug(`Finding lists from: ${url}`)

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Failed to find lists: ${response.status} ${response.statusText} - ${errorText}`)
			throw new Error(`Failed to find lists: ${response.status} ${response.statusText}`)
		}

		const data = (await response.json()) as { entries?: AWeberList[] }
		return data.entries || []
	}

	/**
	 * Get tags for a specific list
	 */
	async getListTags(accountId: number, listId: number): Promise<AWeberListTags> {
		if (process.env.NODE_ENV === 'test') {
			return listTagsMock
		}

		const accessToken = await this.authService.accessToken()

		const url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/tags`

		this.logger.debug(`Getting list tags from: ${url}`)

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Failed to get list tags: ${response.status} ${response.statusText} - ${errorText}`)
			throw new Error(`Failed to get list tags: ${response.status} ${response.statusText}`)
		}

		return (await response.json()) as AWeberListTags
	}
}
