import { Transform } from 'class-transformer'
import { IsString, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator'

export class AWeberCustomFieldQuery {
	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'?: string // The pagination starting offset - defaults to 0

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'?: string // The pagination total entries to retrieve - defaults to 100
}

export class AWeberCreateCustomFieldDto {
	@IsString()
	name!: string // The name of the custom field

	@IsString()
	@IsEnum(['create'])
	'ws.op'!: 'create' // The method name - expecting "create"
}

export class AWeberUpdateCustomFieldDto {
	@IsString()
	@IsOptional()
	name?: string // The name of the custom field

	@IsBoolean()
	@IsOptional()
	is_subscriber_updateable?: boolean // Whether the subscriber is allowed to update the custom field
}
