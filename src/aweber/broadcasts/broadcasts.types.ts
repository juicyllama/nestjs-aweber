export type BroadcastStatus = 'draft' | 'scheduled' | 'sent' | 'admin_hold' | 'sending'

export type BroadcastLink = {
	link_id: number
	total_clicks: number
	unique_clicks: number
	url: string
}

export type BroadcastStats = {
	num_complaints: number
	num_emailed: number
	num_undeliv: number
	unique_clicks: number
	unique_opens: number
}

export type AWeberBroadcast = {
	archive_url: string
	body_html: string
	body_text: string
	body_amp?: string
	broadcast_id: number
	click_tracking_enabled: boolean
	clicks_collection_link: string
	created_at: string
	exclude_lists: string[]
	facebook_integration?: string
	has_customized_body_text: boolean
	include_lists: string[]
	is_archived: boolean
	links: BroadcastLink[]
	notify_on_send: boolean
	opens_collection_link: string
	scheduled_for?: string
	segment_link?: string | null
	segment_name?: string
	self_link: string
	sent_at?: string
	stats: BroadcastStats
	status: BroadcastStatus
	subject: string
	twitter_integration?: string
}

export type AWeberBroadcastCollection = {
	entries: AWeberBroadcast[]
	next_collection_link?: string
	prev_collection_link?: string
	resource_type_link: string
	self_link: string
	start: number
	total_size_link?: string
}

export type AWeberBroadcastTotal = {
	total_size: number
}

export type AWeberBroadcastScheduleResponse = {
	self_link: string
}

export type AWeberBroadcastCancelResponse = {
	self_link: string
}

export type AWeberBroadcastOpen = {
	event_time: string
	subscriber_link: string
	email?: string
}

export type AWeberBroadcastClick = {
	event_time: string
	subscriber_link: string
	link_url: string
	email?: string
}
