import { AuthService } from '../auth/auth.service'
import { AWeberCustomFieldQuery, AWeberCreateCustomFieldDto, AWeberUpdateCustomFieldDto } from './customFields.dto'
import { customFieldMock } from './customFields.mocks'
import { CustomFieldsService } from './customFields.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

// Mock the auth service
const mockAuthService = {
	accessToken: jest.fn().mockResolvedValue('mock-access-token'),
}

describe('CustomFieldsService', () => {
	let app: INestApplication
	let service: CustomFieldsService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				CustomFieldsService,
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
			],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		service = moduleRef.get<CustomFieldsService>(CustomFieldsService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('getCustomFields', () => {
		it('should return custom fields collection', async () => {
			const accountId = 123
			const listId = 456
			const params: AWeberCustomFieldQuery = {
				'ws.start': '0',
				'ws.size': '10',
			}

			const result = await service.getCustomFields(accountId, listId, params)

			expect(result).toEqual([customFieldMock])
		})

		it('should return custom fields collection without params', async () => {
			const accountId = 123
			const listId = 456

			const result = await service.getCustomFields(accountId, listId)

			expect(result).toEqual([customFieldMock])
		})
	})

	describe('createCustomField', () => {
		it('should create a custom field', async () => {
			const accountId = 123
			const listId = 456
			const data: AWeberCreateCustomFieldDto = {
				name: 'Favorite color',
				'ws.op': 'create',
			}

			const result = await service.createCustomField(accountId, listId, data)

			expect(result).toEqual(customFieldMock)
		})
	})

	describe('getCustomField', () => {
		it('should return a specific custom field', async () => {
			const accountId = 123
			const listId = 456
			const customFieldId = 12345

			const result = await service.getCustomField(accountId, listId, customFieldId)

			expect(result).toEqual(customFieldMock)
		})
	})

	describe('updateCustomField', () => {
		it('should update a custom field', async () => {
			const accountId = 123
			const listId = 456
			const customFieldId = 12345
			const data: AWeberUpdateCustomFieldDto = {
				name: 'Updated color',
				is_subscriber_updateable: true,
			}

			const result = await service.updateCustomField(accountId, listId, customFieldId, data)

			expect(result).toEqual(customFieldMock)
		})
	})

	describe('deleteCustomField', () => {
		it('should delete a custom field', async () => {
			const accountId = 123
			const listId = 456
			const customFieldId = 12345

			const result = await service.deleteCustomField(accountId, listId, customFieldId)

			expect(result).toBeUndefined()
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
