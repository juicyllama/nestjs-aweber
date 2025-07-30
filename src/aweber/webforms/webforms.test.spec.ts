import { AuthModule } from '../auth/auth.module'
import { AWeberModule } from '../aweber.module'
import { webformMock, webformSplitTestMock, webformSplitTestComponentMock } from './webforms.mocks'
import { WebformsModule } from './webforms.module'
import { WebformsService } from './webforms.service'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('WebformsService', () => {
	let app: INestApplication
	let service: WebformsService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), AWeberModule, AuthModule, WebformsModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		service = moduleRef.get<WebformsService>(WebformsService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('getWebformsForAccount', () => {
		it('should return webforms for account in test environment', async () => {
			const params = {
				'ws.op': 'getWebForms' as const,
				'ws.size': '100',
				'ws.start': '0',
			}

			const result = await service.getWebformsForAccount(123, params)

			expect(result).toEqual([webformMock])
		})
	})

	describe('getWebformSplitTestsForAccount', () => {
		it('should return webform split tests for account in test environment', async () => {
			const params = {
				'ws.op': 'getWebFormSplitTests' as const,
				'ws.size': '100',
				'ws.start': '0',
			}

			const result = await service.getWebformSplitTestsForAccount(123, params)

			expect(result).toEqual([webformSplitTestMock])
		})
	})

	describe('getWebformsForList', () => {
		it('should return webforms for list in test environment', async () => {
			const params = {
				'ws.size': '100',
				'ws.start': '0',
			}

			const result = await service.getWebformsForList(123, 456, params)

			expect(result).toEqual([webformMock])
		})

		it('should return webforms for list without params in test environment', async () => {
			const result = await service.getWebformsForList(123, 456)

			expect(result).toEqual([webformMock])
		})
	})

	describe('getWebformForList', () => {
		it('should return a specific webform for list in test environment', async () => {
			const result = await service.getWebformForList(123, 456, 789)

			expect(result).toEqual(webformMock)
		})
	})

	describe('getWebformSplitTestsForList', () => {
		it('should return webform split tests for list in test environment', async () => {
			const params = {
				'ws.size': '100',
				'ws.start': '0',
			}

			const result = await service.getWebformSplitTestsForList(123, 456, params)

			expect(result).toEqual([webformSplitTestMock])
		})

		it('should return webform split tests for list without params in test environment', async () => {
			const result = await service.getWebformSplitTestsForList(123, 456)

			expect(result).toEqual([webformSplitTestMock])
		})
	})

	describe('getWebformSplitTestForList', () => {
		it('should return a specific webform split test for list in test environment', async () => {
			const result = await service.getWebformSplitTestForList(123, 456, 789)

			expect(result).toEqual(webformSplitTestMock)
		})
	})

	describe('getWebformSplitTestComponents', () => {
		it('should return webform split test components in test environment', async () => {
			const params = {
				'ws.size': '100',
				'ws.start': '0',
			}

			const result = await service.getWebformSplitTestComponents(123, 456, 789, params)

			expect(result).toEqual([webformSplitTestComponentMock])
		})

		it('should return webform split test components without params in test environment', async () => {
			const result = await service.getWebformSplitTestComponents(123, 456, 789)

			expect(result).toEqual([webformSplitTestComponentMock])
		})
	})

	describe('getWebformSplitTestComponent', () => {
		it('should return a specific webform split test component in test environment', async () => {
			const result = await service.getWebformSplitTestComponent(123, 456, 789, '234-456')

			expect(result).toEqual(webformSplitTestComponentMock)
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
