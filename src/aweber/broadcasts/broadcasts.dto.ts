import { BroadcastStatus } from './broadcasts.types'
import { Transform } from 'class-transformer'
import { IsString, IsOptional, IsBoolean, IsNumber, IsEnum, IsArray, IsDateString } from 'class-validator'

export class AWeberBroadcastQuery {
	@IsEnum(['draft', 'scheduled', 'sent'])
	status!: BroadcastStatus

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.start'?: string //The pagination starting offset - defaults to 0

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	'ws.size'?: string //The pagination total entries to retrieve - defaults to 100
}

export class AWeberBroadcastTotalQuery {
	@IsEnum(['draft', 'scheduled', 'sent'])
	status!: BroadcastStatus
}

export class AWeberCreateBroadcastDto {
	@IsString()
	body_html!: string //The content of the message in html format

	@IsString()
	@IsOptional()
	body_text?: string //The content of the message in plain text

	@IsString()
	@IsOptional()
	body_amp?: string //The content of the message in AMP format

	@IsBoolean()
	@IsOptional()
	click_tracking_enabled?: boolean //Enables links in the email message to be tracked

	@IsArray()
	@IsOptional()
	exclude_lists?: string[] //JSON encoded list of Lists URLs to exclude in the delivery

	@IsArray()
	@IsOptional()
	include_lists?: string[] //JSON encoded list of Lists URLs to include in the delivery

	@IsString()
	@IsOptional()
	facebook_integration?: string //URL to the Facebook broadcast integration

	@IsBoolean()
	@IsOptional()
	is_archived?: boolean //Whether the broadcast enabled sharing via an archive url

	@IsBoolean()
	@IsOptional()
	notify_on_send?: boolean //If true, notify when stats are available on a sent broadcast

	@IsString()
	@IsOptional()
	segment_link?: string //URL to the Segment to send this broadcast to

	@IsString()
	subject!: string //The broadcast subject line

	@IsString()
	@IsOptional()
	twitter_integration?: string //URL to the Twitter broadcast integration
}

export class AWeberUpdateBroadcastDto {
	@IsString()
	@IsOptional()
	body_html?: string //The content of the message in html format

	@IsString()
	@IsOptional()
	body_text?: string //The content of the message in plain text

	@IsString()
	@IsOptional()
	body_amp?: string //The content of the message in AMP format

	@IsBoolean()
	@IsOptional()
	click_tracking_enabled?: boolean //Enables links in the email message to be tracked

	@IsArray()
	@IsOptional()
	exclude_lists?: string[] //JSON encoded list of Lists URLs to exclude in the delivery

	@IsArray()
	@IsOptional()
	include_lists?: string[] //JSON encoded list of Lists URLs to include in the delivery

	@IsString()
	@IsOptional()
	facebook_integration?: string //URL to the Facebook broadcast integration

	@IsBoolean()
	@IsOptional()
	is_archived?: boolean //Whether the broadcast enabled sharing via an archive url

	@IsBoolean()
	@IsOptional()
	notify_on_send?: boolean //If true, notify when stats are available on a sent broadcast

	@IsString()
	@IsOptional()
	subject?: string //The broadcast subject line

	@IsString()
	@IsOptional()
	twitter_integration?: string //URL to the Twitter broadcast integration

	@IsString()
	@IsOptional()
	segment_link?: string //URL to the Segment to send this broadcast to
}

export class AWeberScheduleBroadcastDto {
	@IsDateString()
	scheduled_for!: string //Scheduled time for sending broadcast message, ISO-8601 formatted
}

export class AWeberBroadcastOpensQuery {
	@IsString()
	@IsOptional()
	before?: string //The pagination key when paging in reverse

	@IsString()
	@IsOptional()
	after?: string //The pagination key when paging forward

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	page_size?: string //The pagination total entries to retrieve
}

export class AWeberBroadcastClicksQuery {
	@IsString()
	@IsOptional()
	before?: string //The pagination key when paging in reverse

	@IsString()
	@IsOptional()
	after?: string //The pagination key when paging forward

	@IsNumber()
	@IsOptional()
	@Transform(({ value }: { value: number }) => value.toString())
	page_size?: string //The pagination total entries to retrieve
}
