import {
	AWeberSubscriberStatus,
	AWeberSubscriberSortKey,
	AWeberSortOrder,
	AWeberSubscriberActivityType,
	AWeberSubscriptionMethod,
	AWeberUnsubscribeMethod,
} from './subscribers.types'
import { Type } from 'class-transformer'
import { IsOptional, IsString, IsNumber, IsArray, IsEmail, IsIn, IsObject } from 'class-validator'

export class AWeberGetSubscribersDto {
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	ws_start_at?: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	ws_size?: number

	@IsOptional()
	@IsIn(['subscribed', 'unsubscribed', 'unconfirmed'])
	status?: AWeberSubscriberStatus

	@IsOptional()
	@IsString()
	tag?: string

	@IsOptional()
	@IsString()
	subscribed_before?: string

	@IsOptional()
	@IsString()
	subscribed_after?: string

	@IsOptional()
	@IsString()
	unsubscribed_before?: string

	@IsOptional()
	@IsString()
	unsubscribed_after?: string

	@IsOptional()
	@IsIn(['subscribed_at', 'unsubscribed_at'])
	ws_sort_key?: AWeberSubscriberSortKey

	@IsOptional()
	@IsIn(['asc', 'desc'])
	ws_sort_order?: AWeberSortOrder

	@IsOptional()
	@IsString()
	email?: string
}

export class AWeberCreateSubscriberDto {
	@IsEmail()
	email!: string

	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsObject()
	custom_fields?: Record<string, string | null>

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	tags?: string[]

	@IsOptional()
	@IsString()
	ad_tracking?: string

	@IsOptional()
	@IsString()
	last_followup_message_number_sent?: string

	@IsOptional()
	@IsString()
	ip_address?: string

	@IsOptional()
	@IsString()
	misc_notes?: string

	@IsOptional()
	@IsString()
	strict_custom_fields?: string

	@IsOptional()
	@IsString()
	update_existing?: string
}

export class AWeberUpdateSubscriberDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsObject()
	custom_fields?: Record<string, string | null>

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	tags?: string[]

	@IsOptional()
	@IsString()
	ad_tracking?: string

	@IsOptional()
	@IsString()
	misc_notes?: string
}

export class AWeberGetSubscriberActivityDto {
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	ws_start_at?: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	ws_size?: number

	@IsOptional()
	@IsIn(['subscribed', 'unsubscribed', 'opened', 'clicked', 'sent', 'verified'])
	type?: AWeberSubscriberActivityType

	@IsOptional()
	@IsString()
	after?: string

	@IsOptional()
	@IsString()
	before?: string
}

export class AWeberMoveSubscriberDto {
	@IsNumber()
	@Type(() => Number)
	list_id!: number

	@IsOptional()
	@IsString()
	last_followup_message_number_sent?: string
}

export class AWeberCreatePurchaseDto {
	@IsString()
	product_id!: string

	@IsNumber()
	@Type(() => Number)
	price!: number

	@IsOptional()
	@IsString()
	currency?: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsString()
	occurred_at?: string
}

export class AWeberUpdateSubscriberByEmailDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsObject()
	custom_fields?: Record<string, string | null>

	@IsOptional()
	@IsObject()
	tags?: { add?: string[]; remove?: string[] }

	@IsOptional()
	@IsString()
	ad_tracking?: string

	@IsOptional()
	@IsString()
	misc_notes?: string

	@IsOptional()
	@IsEmail()
	email?: string

	@IsOptional()
	@IsIn(['subscribed', 'unsubscribed'])
	status?: 'subscribed' | 'unsubscribed'

	@IsOptional()
	@IsString()
	strict_custom_fields?: string

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	last_followup_message_number_sent?: number
}

export class AWeberFindSubscribersDto {
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	ws_start?: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	ws_size?: number

	@IsOptional()
	@IsString()
	ws_show?: string

	@IsOptional()
	@IsIn(['subscribed_at', 'unsubscribed_at'])
	sort_key?: AWeberSubscriberSortKey

	@IsOptional()
	@IsIn(['asc', 'desc'])
	sort_order?: AWeberSortOrder

	@IsOptional()
	@IsString()
	ad_tracking?: string

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	area_code?: number

	@IsOptional()
	@IsString()
	city?: string

	@IsOptional()
	@IsString()
	country?: string

	@IsOptional()
	@IsString()
	custom_fields?: string

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	dma_code?: number

	@IsOptional()
	@IsEmail()
	email?: string

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	last_followup_message_number_sent?: number

	@IsOptional()
	@IsString()
	last_followup_message_sent_at?: string

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	latitude?: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	longitude?: number

	@IsOptional()
	@IsString()
	misc_notes?: string

	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	postal_code?: string

	@IsOptional()
	@IsString()
	region?: string

	@IsOptional()
	@IsIn(['subscribed', 'unsubscribed', 'unconfirmed'])
	status?: AWeberSubscriberStatus

	@IsOptional()
	@IsString()
	subscribed_before?: string

	@IsOptional()
	@IsString()
	subscribed_after?: string

	@IsOptional()
	@IsString()
	subscribed_at?: string

	@IsOptional()
	@IsIn(['api', 'email', 'import', 'webform'])
	subscription_method?: AWeberSubscriptionMethod

	@IsOptional()
	@IsString()
	tags?: string

	@IsOptional()
	@IsString()
	tags_not_in?: string

	@IsOptional()
	@IsIn(['unsubscribe link', 'customer cp', 'undeliverable', 'api: unsubscribe', 'api: move'])
	unsubscribe_method?: AWeberUnsubscribeMethod

	@IsOptional()
	@IsString()
	unsubscribed_before?: string

	@IsOptional()
	@IsString()
	unsubscribed_after?: string

	@IsOptional()
	@IsString()
	unsubscribed_at?: string

	@IsOptional()
	@IsString()
	verified_at?: string
}
