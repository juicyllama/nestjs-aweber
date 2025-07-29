import { AWeberCampaignType } from './campaigns.types'
import { Transform } from 'class-transformer'
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator'

export class AWeberCampaignQuery {
	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'?: string //The pagination starting offset - defaults to 0

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'?: string //The pagination total entries to retrieve - defaults to 100
}

export class AWeberFindCampaignsQuery {
	@IsString()
	@IsOptional()
	'ws.op'?: string //The method name - expecting "find"

	@IsEnum(['b', 'f'])
	campaign_type!: AWeberCampaignType //The campaign type (b - broadcast, f - followup)

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
	'ws.show'?: string //A flag to show the total size only - expecting "total_size"
}

export class AWeberCampaignStatsQuery {
	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'?: string //The pagination starting offset - defaults to 0

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'?: string //The pagination total entries to retrieve - defaults to 100
}
