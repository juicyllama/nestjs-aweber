import { AuthService } from './auth/auth.service'
import { AWeberModule } from './aweber.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('AWeberModule Configuration', () => {
	it('should create module with forRoot() default options', async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AWeberModule.forRoot()],
		}).compile()

		expect(module).toBeDefined()
		expect(module.get(AuthService)).toBeDefined()
	})

	it('should create module with forRoot() and direct config', async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				AWeberModule.forRoot({
					config: {
						AWEBER_CLIENT_ID: 'test-client-id',
						AWEBER_CLIENT_SECRET: 'test-client-secret',
					},
				}),
			],
		}).compile()

		expect(module).toBeDefined()
		expect(module.get(AuthService)).toBeDefined()
	})

	it('should create module with forRoot() custom options', async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				AWeberModule.forRoot({
					configModule: {
						isGlobal: true,
						envFilePath: '.env.test',
					},
					cacheModule: {
						isGlobal: true,
						ttl: 5000,
					},
				}),
			],
		}).compile()

		expect(module).toBeDefined()
		expect(module.get(AuthService)).toBeDefined()
	})

	it('should create module with forRootAsync()', async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					isGlobal: true,
				}),
				AWeberModule.forRootAsync({
					imports: [ConfigModule],
					inject: [ConfigService],
					useFactory: () => ({
						configModule: {
							isGlobal: true,
						},
						cacheModule: {
							isGlobal: true,
						},
					}),
				}),
			],
		}).compile()

		expect(module).toBeDefined()
		expect(module.get(AuthService)).toBeDefined()
	})

	it('should create module with forRootAsync() and direct config', async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				AWeberModule.forRootAsync({
					useFactory: () => ({
						config: {
							AWEBER_CLIENT_ID: 'async-test-client-id',
							AWEBER_CLIENT_SECRET: 'async-test-client-secret',
						},
					}),
				}),
			],
		}).compile()

		expect(module).toBeDefined()
		expect(module.get(AuthService)).toBeDefined()
	})

	it('should create module with register() alias', async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AWeberModule.register()],
		}).compile()

		expect(module).toBeDefined()
		expect(module.get(AuthService)).toBeDefined()
	})
})
