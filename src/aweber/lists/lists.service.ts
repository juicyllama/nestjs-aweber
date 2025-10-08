import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import { safeJsonParse } from '../utils/response.utils'
import { AWeberListQuery, AWeberFindListQuery } from './lists.dto'
import { listMock, listTagsMock } from './lists.mocks'
import { AWeberList, AWeberListTags } from './lists.types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListsService {
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

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		const data = await safeJsonParse<{ entries?: AWeberList[] }>(response, 'API Call')
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

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		return await safeJsonParse<AWeberList>(response, 'API Call')
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

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		const data = await safeJsonParse<{ entries?: AWeberList[] }>(response, 'API Call')
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

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		return await safeJsonParse<AWeberListTags>(response, 'API Call')
	}
}
