import { AuthModule } from '../auth/auth.module'
import { AWeberModule } from '../aweber.module'
import { IntegrationsModule } from './integrations.module'
import { IntegrationsService } from './integrations.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

describe('Integrations', () => {
	let app: INestApplication
	let integrationsService: IntegrationsService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AWeberModule.forRoot(), AuthModule, IntegrationsModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		integrationsService = moduleRef.get<IntegrationsService>(IntegrationsService)
	})

	describe('Get Integrations', () => {
		it('should get integrations for an account', async () => {
			const integrations = await integrationsService.getIntegrations(123)
			expect(integrations).toBeDefined()
			expect(integrations.length).toBeGreaterThan(0)
			expect(integrations[0].id).toBeDefined()
			expect(integrations[0].service_name).toBeDefined()
			expect(integrations[0].login).toBeDefined()
			expect(integrations[0].self_link).toBeDefined()
		})

		it('should get integrations for an account with pagination parameters', async () => {
			const integrations = await integrationsService.getIntegrations(123, { 'ws.start': '0', 'ws.size': '10' })
			expect(integrations).toBeDefined()
			expect(integrations.length).toBeGreaterThan(0)
			expect(integrations[0].id).toBeDefined()
		})

		it('should get a specific integration', async () => {
			const integration = await integrationsService.getIntegration(123, 456)
			expect(integration).toBeDefined()
			expect(integration.id).toBe(123)
			expect(integration.service_name).toBe('facebook')
			expect(integration.login).toBe('twitter')
			expect(integration.resource_type_link).toBe('https://api.aweber.com/1.0/#integration')
			expect(integration.self_link).toBeDefined()
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
