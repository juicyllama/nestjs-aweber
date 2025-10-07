import { AuthModule } from '../auth/auth.module'
import { AWeberModule } from '../aweber.module'
import { AWeberCreateBroadcastDto, AWeberUpdateBroadcastDto, AWeberScheduleBroadcastDto } from './broadcasts.dto'
import { BroadcastsModule } from './broadcasts.module'
import { BroadcastsService } from './broadcasts.service'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('Broadcasts', () => {
	let app: INestApplication
	let broadcastsService: BroadcastsService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AWeberModule.forRoot(), AuthModule, BroadcastsModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		broadcastsService = moduleRef.get<BroadcastsService>(BroadcastsService)
	})

	describe('Get Broadcasts', () => {
		it('should get broadcasts for a list', async () => {
			const broadcasts = await broadcastsService.getBroadcasts(123, 456, { status: 'sent' })
			expect(broadcasts).toBeDefined()
			expect(broadcasts.length).toBeGreaterThan(0)
			expect(broadcasts[0].broadcast_id).toBeDefined()
			expect(broadcasts[0].subject).toBeDefined()
			expect(broadcasts[0].status).toBeDefined()
		})

		it('should get total broadcasts for a list', async () => {
			const total = await broadcastsService.getTotalBroadcasts(123, 456, { status: 'sent' })
			expect(total).toBeDefined()
			expect(total.total_size).toBeDefined()
			expect(typeof total.total_size).toBe('number')
		})

		it('should get a specific broadcast', async () => {
			const broadcast = await broadcastsService.getBroadcast(123, 456, 12345)
			expect(broadcast).toBeDefined()
			expect(broadcast.broadcast_id).toBe(12345)
			expect(broadcast.subject).toBe('Weekly Recipes')
			expect(broadcast.status).toBe('admin_hold')
			expect(broadcast.body_html).toBeDefined()
			expect(broadcast.body_text).toBeDefined()
		})
	})

	describe('Create Broadcast', () => {
		it('should create a new broadcast', async () => {
			const createData: AWeberCreateBroadcastDto = {
				body_html: '<html><h1>Test Title</h1><body>Test message body.</body></html>',
				body_text: 'Test message body in plain text',
				subject: 'Test Weekly Recipes',
				click_tracking_enabled: true,
				is_archived: true,
				notify_on_send: true,
			}

			const broadcast = await broadcastsService.createBroadcast(123, 456, createData)
			expect(broadcast).toBeDefined()
			expect(broadcast.broadcast_id).toBeDefined()
			expect(broadcast.subject).toBeDefined()
			expect(broadcast.body_html).toBeDefined()
			expect(broadcast.body_text).toBeDefined()
			expect(broadcast.click_tracking_enabled).toBe(true)
		})
	})

	describe('Update Broadcast', () => {
		it('should update an existing broadcast', async () => {
			const updateData: AWeberUpdateBroadcastDto = {
				subject: 'Updated Weekly Recipes',
				body_html: '<html><h1>Updated Title</h1><body>Updated message body.</body></html>',
				click_tracking_enabled: false,
			}

			const broadcast = await broadcastsService.updateBroadcast(123, 456, 12345, updateData)
			expect(broadcast).toBeDefined()
			expect(broadcast.broadcast_id).toBe(12345)
			expect(broadcast.subject).toBeDefined()
			expect(broadcast.body_html).toBeDefined()
		})
	})

	describe('Schedule Broadcast', () => {
		it('should schedule a broadcast', async () => {
			const scheduleData: AWeberScheduleBroadcastDto = {
				scheduled_for: '2024-12-31T23:59:59Z',
			}

			const result = await broadcastsService.scheduleBroadcast(123, 456, 12345, scheduleData)
			expect(result).toBeDefined()
			expect(result.self_link).toBeDefined()
			expect(result.self_link).toContain('broadcasts/3456789')
		})
	})

	describe('Cancel Broadcast', () => {
		it('should cancel a scheduled broadcast', async () => {
			const result = await broadcastsService.cancelBroadcast(123, 456, 12345)
			expect(result).toBeDefined()
			expect(result.self_link).toBeDefined()
			expect(result.self_link).toContain('broadcasts/3456789')
		})
	})

	describe('Delete Broadcast', () => {
		it('should delete a broadcast', async () => {
			await expect(broadcastsService.deleteBroadcast(123, 456, 12345)).resolves.toBeUndefined()
		})
	})

	describe('Get Broadcast Opens and Clicks', () => {
		it('should get broadcast opens', async () => {
			const opens = await broadcastsService.getBroadcastOpens(123, 456, 12345)
			expect(opens).toBeDefined()
			expect(Array.isArray(opens)).toBe(true)
			if (opens.length > 0) {
				expect(opens[0].event_time).toBeDefined()
				expect(opens[0].subscriber_link).toBeDefined()
			}
		})

		it('should get broadcast clicks', async () => {
			const clicks = await broadcastsService.getBroadcastClicks(123, 456, 12345)
			expect(clicks).toBeDefined()
			expect(Array.isArray(clicks)).toBe(true)
			if (clicks.length > 0) {
				expect(clicks[0].event_time).toBeDefined()
				expect(clicks[0].subscriber_link).toBeDefined()
				expect(clicks[0].link_url).toBeDefined()
			}
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
