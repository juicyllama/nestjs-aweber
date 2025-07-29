export type AWeberList = {
	campaigns_collection_link: URL | string
	custom_fields_collection_link: URL | string
	draft_broadcasts_link: URL | string
	scheduled_broadcasts_link: URL | string
	sent_broadcasts_link: URL | string
	http_etag: string
	id: number
	landing_pages_collection_link: URL | string
	name: string
	resource_type_link: URL | string
	segments_collection_link: URL | string
	self_link: URL | string
	subscribers_collection_link: URL | string
	total_subscribed_subscribers: number
	total_subscribers: number
	total_subscribers_subscribed_today: number
	total_subscribers_subscribed_yesterday: number
	total_unconfirmed_subscribers: number
	total_unsubscribed_subscribers: number
	unique_list_id: string
	uuid: string
	vapid_public_key: string
	web_form_split_tests_collection_link: URL | string
	web_forms_collection_link: URL | string
}

export type AWeberListTags = string[]
