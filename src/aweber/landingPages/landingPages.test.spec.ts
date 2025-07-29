import { AuthModule } from '../auth/auth.module'
import { AWeberModule } from '../aweber.module'
import { landingPageMock } from './landingPages.mocks'
import { LandingPagesModule } from './landingPages.module'
import { LandingPagesService } from './landingPages.service'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('LandingPagesService', () => {
	let app: INestApplication
	let service: LandingPagesService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), AWeberModule, AuthModule, LandingPagesModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		service = moduleRef.get<LandingPagesService>(LandingPagesService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('getLandingPages', () => {
		it('should return landing pages array in test environment', async () => {
			const result = await service.getLandingPages(123, 456)
			expect(result).toEqual([landingPageMock])
		})
	})

	describe('getLandingPage', () => {
		it('should return single landing page in test environment', async () => {
			const result = await service.getLandingPage(123, 456, '48b38cd9-a5df-4297-8987-ed31b3093b39')
			expect(result).toEqual(landingPageMock)
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
