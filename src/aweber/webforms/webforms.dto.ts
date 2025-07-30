import { Transform } from 'class-transformer'
import { IsString, IsOptional, IsNumber } from 'class-validator'

export class AWeberWebformsForAccountQuery {
	@IsString()
	'ws.op'!: 'getWebForms' // The method name - expecting "getWebForms"

	@IsNumber()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'!: string // The pagination total entries to retrieve

	@IsNumber()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'!: string // The pagination starting offset
}

export class AWeberWebformSplitTestsForAccountQuery {
	@IsString()
	'ws.op'!: 'getWebFormSplitTests' // The method name - expecting "getWebFormSplitTests"

	@IsNumber()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'!: string // The pagination total entries to retrieve

	@IsNumber()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'!: string // The pagination starting offset
}

export class AWeberWebformsQuery {
	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'?: string // The pagination starting offset - defaults to 0

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'?: string // The pagination total entries to retrieve - defaults to 100
}

export class AWeberWebformSplitTestsQuery {
	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'?: string // The pagination starting offset - defaults to 0

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'?: string // The pagination total entries to retrieve - defaults to 100
}

export class AWeberWebformSplitTestComponentsQuery {
	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'?: string // The pagination starting offset - defaults to 0

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'?: string // The pagination total entries to retrieve - defaults to 100
}
