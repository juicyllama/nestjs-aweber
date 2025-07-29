import { Transform } from 'class-transformer'
import { IsString, IsOptional, IsNumber } from 'class-validator'

export class AWeberListQuery {
	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'?: string //The pagination starting offset - defaults to 0

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'?: string //The pagination total entries to retrieve - defaults to 100
}

export class AWeberFindListQuery {
	@IsString()
	'ws.op'!: 'find' //The method name - expecting "find"

	@IsString()
	@IsOptional()
	name?: string //Name or unique list ID of the list

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'?: string //The pagination starting offset - defaults to 0

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'?: string //The pagination total entries to retrieve - defaults to 100

	@IsString()
	@IsOptional()
	'ws.show'?: 'total_size' //A flag to show the total size only - expecting "total_size", when added the response will be an integer
}
