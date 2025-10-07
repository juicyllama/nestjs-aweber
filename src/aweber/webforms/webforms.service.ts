import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import {
	AWeberWebformsForAccountQuery,
	AWeberWebformSplitTestsForAccountQuery,
	AWeberWebformsQuery,
	AWeberWebformSplitTestsQuery,
	AWeberWebformSplitTestComponentsQuery,
} from './webforms.dto'
import { webformMock, webformSplitTestMock, webformSplitTestComponentMock } from './webforms.mocks'
import { AWeberWebform, AWeberWebformSplitTest, AWeberWebformSplitTestComponent } from './webforms.types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WebformsService {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Get webforms for all lists on an account
	 */
	async getWebformsForAccount(accountId: number, params: AWeberWebformsForAccountQuery): Promise<AWeberWebform[]> {
		if (process.env.NODE_ENV === 'test') {
			return [webformMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}`
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
			throw new Error(`Get Webforms For Account API Call failed: ${response.status} - ${errorText}`)
		}

		const responseData = (await response.json()) as { entries: AWeberWebform[] }
		return responseData.entries || []
	}

	/**
	 * Get webform split tests for all lists on an account
	 */
	async getWebformSplitTestsForAccount(
		accountId: number,
		params: AWeberWebformSplitTestsForAccountQuery,
	): Promise<AWeberWebformSplitTest[]> {
		if (process.env.NODE_ENV === 'test') {
			return [webformSplitTestMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}`
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
			throw new Error(`Get Webform Split Tests For Account API Call failed: ${response.status} - ${errorText}`)
		}

		const responseData = (await response.json()) as { entries: AWeberWebformSplitTest[] }
		return responseData.entries || []
	}

	/**
	 * Get webforms for a specific list
	 */
	async getWebformsForList(
		accountId: number,
		listId: number,
		params?: AWeberWebformsQuery,
	): Promise<AWeberWebform[]> {
		if (process.env.NODE_ENV === 'test') {
			return [webformMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/web_forms`
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
			throw new Error(`Get Webforms For List API Call failed: ${response.status} - ${errorText}`)
		}

		const responseData = (await response.json()) as { entries: AWeberWebform[] }
		return responseData.entries || []
	}

	/**
	 * Get a specific webform for a list
	 */
	async getWebformForList(accountId: number, listId: number, webformId: number): Promise<AWeberWebform> {
		if (process.env.NODE_ENV === 'test') {
			return webformMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/web_forms/${webformId}`,
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
			throw new Error(`Get Webform For List API Call failed: ${response.status} - ${errorText}`)
		}

		return (await response.json()) as AWeberWebform
	}

	/**
	 * Get webform split tests for a specific list
	 */
	async getWebformSplitTestsForList(
		accountId: number,
		listId: number,
		params?: AWeberWebformSplitTestsQuery,
	): Promise<AWeberWebformSplitTest[]> {
		if (process.env.NODE_ENV === 'test') {
			return [webformSplitTestMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/web_form_split_tests`
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
			throw new Error(`Get Webform Split Tests For List API Call failed: ${response.status} - ${errorText}`)
		}

		const responseData = (await response.json()) as { entries: AWeberWebformSplitTest[] }
		return responseData.entries || []
	}

	/**
	 * Get a specific webform split test for a list
	 */
	async getWebformSplitTestForList(
		accountId: number,
		listId: number,
		splitTestId: number,
	): Promise<AWeberWebformSplitTest> {
		if (process.env.NODE_ENV === 'test') {
			return webformSplitTestMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/web_form_split_tests/${splitTestId}`,
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
			throw new Error(`Get Webform Split Test For List API Call failed: ${response.status} - ${errorText}`)
		}

		return (await response.json()) as AWeberWebformSplitTest
	}

	/**
	 * Get webform split test components
	 */
	async getWebformSplitTestComponents(
		accountId: number,
		listId: number,
		splitTestId: number,
		params?: AWeberWebformSplitTestComponentsQuery,
	): Promise<AWeberWebformSplitTestComponent[]> {
		if (process.env.NODE_ENV === 'test') {
			return [webformSplitTestComponentMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/web_form_split_tests/${splitTestId}/components`
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
			throw new Error(`Get Webform Split Test Components API Call failed: ${response.status} - ${errorText}`)
		}

		const responseData = (await response.json()) as { entries: AWeberWebformSplitTestComponent[] }
		return responseData.entries || []
	}

	/**
	 * Get a specific webform split test component
	 */
	async getWebformSplitTestComponent(
		accountId: number,
		listId: number,
		splitTestId: number,
		componentId: string,
	): Promise<AWeberWebformSplitTestComponent> {
		if (process.env.NODE_ENV === 'test') {
			return webformSplitTestComponentMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/web_form_split_tests/${splitTestId}/components/${componentId}`,
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
			throw new Error(`Get Webform Split Test Component API Call failed: ${response.status} - ${errorText}`)
		}

		return (await response.json()) as AWeberWebformSplitTestComponent
	}
}
