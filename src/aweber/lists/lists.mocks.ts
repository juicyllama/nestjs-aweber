import { AWeberList, AWeberListTags } from './lists.types'

export const listMock: AWeberList = {
	campaigns_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/campaigns',
	custom_fields_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/custom_fields',
	draft_broadcasts_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts?status=draft',
	scheduled_broadcasts_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts?status=scheduled',
	sent_broadcasts_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts?status=sent',
	http_etag: '"902ba3cda1883801594b6e1b452790cc53948fda-f83cb0ac22a8d5f792417f9b3dc0e9dc7558aa32"',
	id: 456,
	landing_pages_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/landing_pages',
	name: 'Weekly Newsletter',
	resource_type_link: 'https://api.aweber.com/1.0/#list',
	segments_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/segments',
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456',
	subscribers_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/subscribers',
	total_subscribed_subscribers: 250,
	total_subscribers: 275,
	total_subscribers_subscribed_today: 4,
	total_subscribers_subscribed_yesterday: 3,
	total_unconfirmed_subscribers: 10,
	total_unsubscribed_subscribers: 5,
	unique_list_id: 'awlist456',
	uuid: '123e4567-e89b-12d3-a456-426655440000',
	vapid_public_key: 'BEJSWW8eHj_XKHt5AHpaL3tw0gee8NI2j06xyEIDmOfRGbHmqZVlwsvMO0yISFe834TaBEZRkbdHyTvSXhYCW6E',
	web_form_split_tests_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/web_form_split_tests',
	web_forms_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/web_forms',
}

export const listTagsMock: AWeberListTags = ['alpha', 'beta', 'gamma']
