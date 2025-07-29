import { AuthModule } from '../auth/auth.module'
import { AWeberModule } from '../aweber.module'
import { AWeberFindCampaignsQuery } from './campaigns.dto'
import { CampaignsModule } from './campaigns.module'
import { CampaignsService } from './campaigns.service'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('Campaigns', () => {
	let app: INestApplication
	let campaignsService: CampaignsService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), AWeberModule, AuthModule, CampaignsModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		campaignsService = moduleRef.get<CampaignsService>(CampaignsService)
	})

	describe('Get Campaigns', () => {
		it('should get campaigns for a list', async () => {
			const campaigns = await campaignsService.getCampaigns(123, 456, { 'ws.start': '0', 'ws.size': '100' })
			expect(campaigns).toBeDefined()
			expect(campaigns).toBeDefined()
			expect(campaigns.length).toBeGreaterThan(0)
			expect(campaigns[0].id).toBeDefined()
			expect(campaigns[0].subject).toBeDefined()
			expect(campaigns[0].campaign_type).toBeDefined()
		})

		it('should get a specific campaign', async () => {
			const campaign = await campaignsService.getCampaign(123, 456, 'b', '1234567')
			expect(campaign).toBeDefined()
			expect(campaign.id).toBe('1234567')
			expect(campaign.subject).toBe('Weekly Recipes')
			expect(campaign.campaign_type).toBe('b')
			expect(campaign.click_tracking_enabled).toBe(true)
			expect(campaign.is_archived).toBe(true)
		})

		it('should find campaigns by type', async () => {
			const findQuery: AWeberFindCampaignsQuery = {
				'ws.op': 'find',
				campaign_type: 'b',
				'ws.start': '0',
				'ws.size': '100',
			}
			const campaigns = await campaignsService.findCampaigns(123, 456, findQuery)
			expect(campaigns).toBeDefined()
			expect(campaigns.length).toBeGreaterThan(0)
			expect(campaigns[0].campaign_type).toBe('b')
		})

		it('should get broadcast statistics for a campaign', async () => {
			const stats = await campaignsService.getBroadcastStatistics(123, 456, '789', {
				'ws.start': '0',
				'ws.size': '100',
			})
			expect(stats).toBeDefined()
			expect(stats.length).toBeGreaterThan(0)
			expect(stats[0].id).toBeDefined()
			expect(stats[0].value).toBeDefined()
			expect(stats[0].description).toBeDefined()
		})

		it('should get a specific broadcast statistic for a campaign', async () => {
			const statistic = await campaignsService.getBroadcastStatistic(123, 456, '789', 'total_clicks')
			expect(statistic).toBeDefined()
			expect(statistic.id).toBe('total_clicks')
			expect(statistic.value).toBe(21)
			expect(statistic.description).toContain('total number of times a subscriber clicked')
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
