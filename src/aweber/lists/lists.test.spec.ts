import { AuthModule } from '../auth/auth.module'
import { AWeberModule } from '../aweber.module'
import { listMock, listTagsMock } from './lists.mocks'
import { ListsModule } from './lists.module'
import { ListsService } from './lists.service'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('ListsService', () => {
	let app: INestApplication
	let service: ListsService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AWeberModule.forRoot(), AuthModule, ListsModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		service = moduleRef.get<ListsService>(ListsService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('getLists', () => {
		it('should return an array of lists', async () => {
			const accountId = 123
			const result = await service.getLists(accountId)

			expect(result).toEqual([listMock])
			expect(Array.isArray(result)).toBe(true)
		})

		it('should handle query parameters', async () => {
			const accountId = 123
			const params = {
				'ws.start': '0',
				'ws.size': '10',
			}
			const result = await service.getLists(accountId, params)

			expect(result).toEqual([listMock])
		})
	})

	describe('getList', () => {
		it('should return a single list', async () => {
			const accountId = 123
			const listId = 456
			const result = await service.getList(accountId, listId)

			expect(result).toEqual(listMock)
			expect(result.id).toBe(456)
			expect(result.name).toBe('Weekly Newsletter')
		})
	})

	describe('findLists', () => {
		it('should find lists by name', async () => {
			const accountId = 123
			const params = {
				'ws.op': 'find' as const,
				name: 'Weekly Newsletter',
			}
			const result = await service.findLists(accountId, params)

			expect(result).toEqual([listMock])
			expect(Array.isArray(result)).toBe(true)
		})

		it('should handle pagination parameters', async () => {
			const accountId = 123
			const params = {
				'ws.op': 'find' as const,
				name: 'Weekly Newsletter',
				'ws.start': '0',
				'ws.size': '10',
			}
			const result = await service.findLists(accountId, params)

			expect(result).toEqual([listMock])
		})
	})

	describe('getListTags', () => {
		it('should return list tags', async () => {
			const accountId = 123
			const listId = 456
			const result = await service.getListTags(accountId, listId)

			expect(result).toEqual(listTagsMock)
			expect(Array.isArray(result)).toBe(true)
			expect(result).toContain('alpha')
			expect(result).toContain('beta')
			expect(result).toContain('gamma')
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
