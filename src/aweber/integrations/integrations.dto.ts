import { Transform } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class AWeberIntegrationsQuery {
	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'?: string // The pagination starting offset - defaults to 0

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'?: string // The pagination total entries to retrieve - defaults to 100
}
