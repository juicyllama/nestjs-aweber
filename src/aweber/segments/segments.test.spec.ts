import { AuthModule } from '../auth/auth.module'
import { AWeberModule } from '../aweber.module'
import { segmentMock, segmentsMock } from './segments.mocks'
import { SegmentsModule } from './segments.module'
import { SegmentsService } from './segments.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

// Mock the environment variable to be 'test'
process.env.NODE_ENV = 'test'

describe('SegmentsService', () => {
	let app: INestApplication
	let service: SegmentsService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AWeberModule.forRoot(), AuthModule, SegmentsModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		service = moduleRef.get<SegmentsService>(SegmentsService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('getSegments', () => {
		it('should return an array of segments', async () => {
			const accountId = 123
			const listId = 456
			const params = { 'ws.start': '0', 'ws.size': '100' }

			const result = await service.getSegments(accountId, listId, params)

			expect(result).toEqual(segmentsMock)
			expect(Array.isArray(result)).toBe(true)
			expect(result.length).toBeGreaterThan(0)
		})

		it('should return segments without params', async () => {
			const accountId = 123
			const listId = 456

			const result = await service.getSegments(accountId, listId)

			expect(result).toEqual(segmentsMock)
			expect(Array.isArray(result)).toBe(true)
		})

		it('should handle empty params object', async () => {
			const accountId = 123
			const listId = 456
			const params = {}

			const result = await service.getSegments(accountId, listId, params)

			expect(result).toEqual(segmentsMock)
			expect(Array.isArray(result)).toBe(true)
		})
	})

	describe('getSegment', () => {
		it('should return a single segment', async () => {
			const accountId = 123
			const listId = 456
			const segmentId = 1

			const result = await service.getSegment(accountId, listId, segmentId)

			expect(result).toEqual(segmentMock)
			expect(result.id).toBe(segmentMock.id)
			expect(result.name).toBe(segmentMock.name)
		})

		it('should return segment with correct properties', async () => {
			const accountId = 123
			const listId = 456
			const segmentId = 1

			const result = await service.getSegment(accountId, listId, segmentId)

			expect(result).toHaveProperty('id')
			expect(result).toHaveProperty('name')
			expect(result).toHaveProperty('is_split_test')
			expect(result).toHaveProperty('resource_type_link')
			expect(result).toHaveProperty('self_link')
		})
	})
})
