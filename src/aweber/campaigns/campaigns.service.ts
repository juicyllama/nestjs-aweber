import { AWEBER_API_BASE_URL } from '../auth/auth.constants'
import { AuthService } from '../auth/auth.service'
import { AWeberCampaignQuery, AWeberFindCampaignsQuery, AWeberCampaignStatsQuery } from './campaigns.dto'
import { campaignMock, campaignStatisticMock } from './campaigns.mocks'
import { AWeberCampaign, AWeberCampaignStatistic, CampaignType, CampaignStatsId } from './campaigns.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class CampaignsService {
	private readonly logger = new Logger(CampaignsService.name)

	constructor(private readonly authService: AuthService) {}

	/**
	 * Get campaigns for a specific list
	 */
	async getCampaigns(accountId: number, listId: number, params?: AWeberCampaignQuery): Promise<AWeberCampaign[]> {
		if (process.env.NODE_ENV === 'test') {
			return [campaignMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/campaigns`
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
			this.logger.error(`Get Campaigns API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Get Campaigns API Call failed: ${response.status}`)
		}

		const responseData = (await response.json()) as { entries: AWeberCampaign[] }
		return responseData.entries || [] // Ensure we return an array, even if empty
	}

	/**
	 * Get a specific campaign
	 */
	async getCampaign(
		accountId: number,
		listId: number,
		campaignType: CampaignType,
		campaignId: string,
	): Promise<AWeberCampaign> {
		if (process.env.NODE_ENV === 'test') {
			return campaignMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/campaigns/${campaignType}${campaignId}`,
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
			this.logger.error(`Get Campaign API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Get Campaign API Call failed: ${response.status}`)
		}

		return (await response.json()) as AWeberCampaign
	}

	/**
	 * Find campaigns by type
	 */
	async findCampaigns(
		accountId: number,
		listId: number,
		params: AWeberFindCampaignsQuery,
	): Promise<AWeberCampaign[]> {
		if (process.env.NODE_ENV === 'test') {
			return [campaignMock]
		}

		const accessToken = await this.authService.accessToken()

		// Set ws.op to 'find' if not already set
		const queryParams = { ...params, 'ws.op': 'find' }

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/campaigns`
		url += '?' + new URLSearchParams(queryParams as unknown as Record<string, string>).toString()

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Find Campaigns API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Find Campaigns API Call failed: ${response.status}`)
		}

		const responseData = (await response.json()) as { entries: AWeberCampaign[] }
		return responseData.entries || [] // Ensure we return an array, even if empty
	}

	/**
	 * Get broadcast statistics for a campaign
	 */
	async getBroadcastStatistics(
		accountId: number,
		listId: number,
		campaignId: string,
		params?: AWeberCampaignStatsQuery,
	): Promise<AWeberCampaignStatistic[]> {
		if (process.env.NODE_ENV === 'test') {
			return [campaignStatisticMock]
		}

		const accessToken = await this.authService.accessToken()

		let url = `${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/campaigns/b${campaignId}/stats`
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
			this.logger.error(`Get Broadcast Statistics API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Get Broadcast Statistics API Call failed: ${response.status}`)
		}

		const responseData = (await response.json()) as { entries: AWeberCampaignStatistic[] }
		return responseData.entries || [] // Ensure we return an array, even if empty
	}

	/**
	 * Get a specific broadcast statistic for a campaign
	 */
	async getBroadcastStatistic(
		accountId: number,
		listId: number,
		campaignId: string,
		statsId: CampaignStatsId,
	): Promise<AWeberCampaignStatistic> {
		if (process.env.NODE_ENV === 'test') {
			return campaignStatisticMock
		}

		const accessToken = await this.authService.accessToken()

		const response = await fetch(
			`${AWEBER_API_BASE_URL}/accounts/${accountId}/lists/${listId}/campaigns/b${campaignId}/stats/${statsId}`,
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
			this.logger.error(`Get Broadcast Statistic API Call failed: ${response.status} - ${errorText}`)
			throw new Error(`Get Broadcast Statistic API Call failed: ${response.status}`)
		}

		return (await response.json()) as AWeberCampaignStatistic
	}
}
