import { AuthModule } from '../auth/auth.module'
import { AWeberModule } from '../aweber.module'
import { AccountsModule } from './accounts.module'
import { AccountsService } from './accounts.service'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('Accounts', () => {
	let app: INestApplication
	let accountsService: AccountsService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), AWeberModule, AuthModule, AccountsModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		accountsService = moduleRef.get<AccountsService>(AccountsService)
	})

	describe('Get', () => {
		it('Get Accounts', async () => {
			const accounts = await accountsService.getAccounts()
			expect(accounts).toBeDefined()
			expect(accounts.length).toBeGreaterThan(0)
			expect(accounts[0].id).toBeDefined()
			expect(accounts[0].company).toBeDefined()
			expect(accounts[0].uuid).toBeDefined()
		})

		it('Get Account by ID', async () => {
			const account = await accountsService.getAccount(123)
			expect(account).toBeDefined()
			expect(account.id).toBe(123)
			expect(account.company).toBe('Example Company 1')
			expect(account.uuid).toBe('b619e767-9de6-43b7-a914-9a8d77a08ee5')
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
