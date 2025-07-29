import { Transform } from 'class-transformer'
import { IsString, IsOptional, IsNumber } from 'class-validator'

export class AWeberLandingPageQuery {
	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'?: string // The pagination starting offset - defaults to 0

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'?: string // The pagination total entries to retrieve - defaults to 100
}

export class AWeberLandingPageParams {
	@IsString()
	accountId!: string

	@IsString()
	listId!: string

	@IsString()
	@IsOptional()
	landingPageId?: string
}
