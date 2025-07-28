import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { AuthModule } from '../auth/auth.module'
import { AccountsModule } from './accounts.module'
import { ConfigModule } from '@nestjs/config'
import { AWeberModule } from '../aweber.module'

describe('Accounts', () => {

	let app: INestApplication;
	let accountsService: AccountsService

	beforeAll(async () => {

		const moduleRef = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot(), 
				AWeberModule,
				AuthModule,
				AccountsModule
			],
		})
      	.compile();

		app = moduleRef.createNestApplication();
		await app.init();

		accountsService = moduleRef.get<AccountsService>(AccountsService)
		
	})

	describe('Get', () => {
		it('Get Accounts', async () => {
			const accounts = await accountsService.getAccounts()

			console.log(accounts)
			expect(accounts).toBeDefined()

			//expect(rates.date).toBeDefined()
			//expect(rates.quotes.USDAUD).toBeDefined()
		})
	})


	afterAll(async () => {
		await app.close();
	})
})
