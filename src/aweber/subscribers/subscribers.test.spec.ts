import { AuthModule } from '../auth/auth.module'
import { AWeberModule } from '../aweber.module'
import {
	AWeberCreateSubscriberDto,
	AWeberMoveSubscriberDto,
	AWeberUpdateSubscriberDto,
	AWeberCreatePurchaseDto,
} from './subscribers.dto'
import { SubscribersModule } from './subscribers.module'
import { SubscribersService } from './subscribers.service'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('Subscribers', () => {
	let app: INestApplication
	let subscribersService: SubscribersService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AWeberModule.forRoot(), AuthModule, SubscribersModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		subscribersService = moduleRef.get<SubscribersService>(SubscribersService)
	})

	describe('Get Subscribers', () => {
		it('should get subscribers for a list', async () => {
			const subscribers = await subscribersService.getSubscribers(123, 456, { status: 'subscribed' })
			expect(subscribers).toBeDefined()
			expect(subscribers.length).toBeGreaterThan(0)
			expect(subscribers[0].id).toBeDefined()
			expect(subscribers[0].email).toBeDefined()
			expect(subscribers[0].status).toBeDefined()
		})

		it('should get total subscribers for a list', async () => {
			const total = await subscribersService.getSubscribersTotal(123, 456, { status: 'subscribed' })
			expect(total).toBeDefined()
			expect(total.total_size).toBeDefined()
			expect(typeof total.total_size).toBe('number')
		})

		it('should get a specific subscriber', async () => {
			const subscriber = await subscribersService.getSubscriber(123, 456, 789)
			expect(subscriber).toBeDefined()
			expect(subscriber.id).toBe(789)
			expect(subscriber.email).toBe('user@example.com')
			expect(subscriber.status).toBe('subscribed')
			expect(subscriber.name).toBe('John Doe')
		})
	})

	describe('Create Subscriber', () => {
		it('should create a new subscriber', async () => {
			const createData: AWeberCreateSubscriberDto = {
				email: 'newuser@example.com',
				name: 'New User',
				custom_fields: { apple: 'fuji' },
				tags: ['test', 'new'],
			}

			const subscriber = await subscribersService.createSubscriber(123, 456, createData)
			expect(subscriber).toBeDefined()
			expect(subscriber.email).toBe('newuser@example.com')
			expect(subscriber.id).toBeDefined()
		})
	})

	describe('Update Subscriber by ID', () => {
		it('should update a subscriber by ID', async () => {
			const updateData: AWeberUpdateSubscriberDto = {
				name: 'Updated Name',
				custom_fields: { apple: 'granny_smith' },
				tags: ['updated'],
			}

			const subscriber = await subscribersService.updateSubscriberById(123, 456, 789, updateData)
			expect(subscriber).toBeDefined()
			expect(subscriber.id).toBe(789)
		})
	})

	describe('Delete Subscriber by ID', () => {
		it('should delete a subscriber by ID', async () => {
			await expect(subscribersService.deleteSubscriberById(123, 456, 789)).resolves.not.toThrow()
		})
	})

	describe('Subscriber Activity', () => {
		it('should get subscriber activity', async () => {
			const activity = await subscribersService.getSubscriberActivity(123, 456, 789, { type: 'subscribed' })
			expect(activity).toBeDefined()
			expect(activity.length).toBeGreaterThan(0)
			expect(activity[0].id).toBeDefined()
			expect(activity[0].type).toBeDefined()
			expect(activity[0].event_time).toBeDefined()
		})
	})

	describe('Move Subscriber', () => {
		it('should move a subscriber to another list', async () => {
			const moveData: AWeberMoveSubscriberDto = {
				list_id: 789,
				last_followup_message_number_sent: '0',
			}

			const result = await subscribersService.moveSubscriber(123, 456, 789, moveData)
			expect(result).toBeDefined()
			expect(result.self_link).toBeDefined()
		})
	})

	describe('Create Purchase', () => {
		it('should create a purchase event for a subscriber', async () => {
			const purchaseData: AWeberCreatePurchaseDto = {
				product_id: 'PROD123',
				price: 29.99,
				currency: 'USD',
				description: 'Test Product',
			}

			const result = await subscribersService.createPurchase(123, 456, 789, purchaseData)
			expect(result).toBeDefined()
			expect(result.message).toBeDefined()
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
