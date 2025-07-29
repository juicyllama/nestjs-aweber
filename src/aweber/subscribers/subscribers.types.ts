export type AWeberSubscriberStatus = 'subscribed' | 'unsubscribed' | 'unconfirmed'

export type AWeberSubscriptionMethod = 'api' | 'email' | 'import' | 'webform'

export type AWeberUnsubscribeMethod =
	| 'unsubscribe link'
	| 'customer cp'
	| 'undeliverable'
	| 'api: unsubscribe'
	| 'api: move'

export type AWeberSubscriberSortKey = 'subscribed_at' | 'unsubscribed_at'

export type AWeberSortOrder = 'asc' | 'desc'

export type AWeberSubscriberActivityType = 'subscribed' | 'unsubscribed' | 'opened' | 'clicked' | 'sent' | 'verified'

export type AWeberSubscriber = {
	ad_tracking?: string
	area_code?: number
	city?: string
	country?: string
	custom_fields?: Record<string, string | null>
	dma_code?: number
	email: string
	id: number
	ip_address?: string
	is_verified: boolean
	last_followup_message_number_sent?: number
	last_followup_sent_at?: string
	last_followup_sent_link?: string
	latitude?: number
	longitude?: number
	misc_notes?: string
	name?: string
	postal_code?: string
	region?: string
	resource_type_link: string
	self_link: string
	status: AWeberSubscriberStatus
	subscribed_at: string
	subscription_method: AWeberSubscriptionMethod
	subscription_url?: string
	tags: string[]
	unsubscribe_method?: AWeberUnsubscribeMethod | null
	unsubscribed_at?: string | null
	verified_at?: string | null
	uuid?: string
}

export type AWeberSubscriberTotal = {
	total_size: number
}

export type AWeberSubscriberActivity = {
	event_time: string
	http_etag: string
	id: number
	resource_type_link: string
	self_link: string
	subscriber_link: string
	type: AWeberSubscriberActivityType
}

export type AWeberMoveSubscriberResponse = {
	self_link: string
}

export type AWeberCreatePurchaseResponse = {
	message: string
}
