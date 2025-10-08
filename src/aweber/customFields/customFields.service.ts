import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import { safeJsonParse } from '../utils/response.utils'
import { AWeberCustomFieldQuery, AWeberCreateCustomFieldDto, AWeberUpdateCustomFieldDto } from './customFields.dto'
import { customFieldMock } from './customFields.mocks'
import { AWeberCustomField } from './customFields.types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CustomFieldsService {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Get custom fields for a specific list
	 */
	async getCustomFields(
		accountId: number,
		listId: number,
		params?: AWeberCustomFieldQuery,
	): Promise<AWeberCustomField[]> {
		if (process.env.NODE_ENV === 'test') {
			return [customFieldMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/custom_fields`
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

		const responseData = await safeJsonParse<{ entries: AWeberCustomField[] }>(response, 'API Call')
		return responseData.entries || [] // Ensure we return an array, even if empty
	}

	/**
	 * Create a new custom field
	 */
	async createCustomField(
		accountId: number,
		listId: number,
		data: AWeberCreateCustomFieldDto,
	): Promise<AWeberCustomField> {
		if (process.env.NODE_ENV === 'test') {
			return customFieldMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/custom_fields`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		return await safeJsonParse<AWeberCustomField>(response, 'API Call')
	}

	/**
	 * Get a specific custom field by ID
	 */
	async getCustomField(accountId: number, listId: number, customFieldId: number): Promise<AWeberCustomField> {
		if (process.env.NODE_ENV === 'test') {
			return customFieldMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/custom_fields/${customFieldId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		)

		return await safeJsonParse<AWeberCustomField>(response, 'API Call')
	}

	/**
	 * Update a custom field
	 */
	async updateCustomField(
		accountId: number,
		listId: number,
		customFieldId: number,
		data: AWeberUpdateCustomFieldDto,
	): Promise<AWeberCustomField> {
		if (process.env.NODE_ENV === 'test') {
			return customFieldMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/custom_fields/${customFieldId}`,
			{
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			},
		)

		return await safeJsonParse<AWeberCustomField>(response, 'API Call')
	}

	/**
	 * Delete a custom field
	 */
	async deleteCustomField(accountId: number, listId: number, customFieldId: number): Promise<void> {
		if (process.env.NODE_ENV === 'test') {
			return
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/custom_fields/${customFieldId}`,
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
			throw new Error(`Delete Custom Field API Call failed: ${response.status} - ${errorText}`)
		}
	}
}
