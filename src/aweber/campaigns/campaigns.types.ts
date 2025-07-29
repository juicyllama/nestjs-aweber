export type AWeberCampaignType = 'b' | 'f' // b = broadcast, f = followup

export type AWeberCampaignContentType = 'Text' | 'HTML' | 'Text/HTML'

export type AWeberCampaignStatsId =
	| 'total_clicks'
	| 'unique_clicks'
	| 'total_opens'
	| 'unique_opens'
	| 'total_sales'
	| 'total_sales_dollars'
	| 'total_unsubscribed'
	| 'hourly_opens'
	| 'hourly_clicks'
	| 'hourly_webhits'
	| 'hourly_sales'
	| 'hourly_unsubscribed'
	| 'daily_opens'
	| 'daily_clicks'
	| 'daily_webhits'
	| 'daily_sales'
	| 'daily_unsubscribed'
	| 'clicks_by_link'
	| 'webhits_by_link'
	| 'opens_by_subscriber'
	| 'sales_by_subscriber'

export type AWeberCampaign = {
	campaign_type: AWeberCampaignType
	click_tracking_enabled: boolean
	content_type: AWeberCampaignContentType
	id: string
	is_archived: boolean
	links_collection_link: URL | string
	message_interval: number
	message_number: number
	resource_type_link: URL | string
	scheduled_at?: string
	self_link: URL | string
	sent_at?: string
	spam_assassin_score?: number
	stats_collection_link: URL | string
	subject: string
	total_clicks: number
	total_opens: number
	total_sent: number
	total_spam_complaints: number
	total_undelivered: number
	total_unsubscribes: number
	twitter_account_link?: URL | string
}

export type AWeberCampaignStatistic = {
	description: string
	id: AWeberCampaignStatsId
	resource_type_link: URL | string
	self_link: URL | string
	value: number
}
