import { AuthService } from './aweber/auth/auth.service'
import { AWeberModule } from './aweber/aweber.module'
import { Test, TestingModule } from '@nestjs/testing'

describe('Client Usage Example', () => {
	it('should work with client configuration pattern', async () => {
		// This mimics the exact usage pattern from the client
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				AWeberModule.forRoot({
					config: {
						AWEBER_CLIENT_ID: 'ABC',
						AWEBER_CLIENT_SECRET: 'DEG',
					},
				}),
			],
		}).compile()

		expect(module).toBeDefined()

		// Verify that the AuthService is available and properly configured
		const authService = module.get(AuthService)
		expect(authService).toBeDefined()

		// Test that the module can be created without errors
		const app = module.createNestApplication()
		await app.init()

		expect(app).toBeDefined()

		await app.close()
	})
})
