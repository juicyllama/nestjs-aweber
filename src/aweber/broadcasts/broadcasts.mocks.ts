import { AWeberBroadcast } from './broadcasts.types'

export const broadcastMock: AWeberBroadcast = {
	archive_url: 'http://archive.aweber.com/awlist12345/9198b',
	body_html: '<html><h1>Title</h1><body>Message body.</body></html>',
	body_text: 'This is the content of my message',
	body_amp: '<html amp4email><body>content</body></html>',
	broadcast_id: 12345,
	click_tracking_enabled: true,
	clicks_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts/3456789/clicks',
	created_at: '2015-10-23T16:19:20.000Z',
	exclude_lists: ['https://api.aweber.com/1.0/accounts/123/lists/456'],
	facebook_integration: 'https://api.aweber.com/1.0/accounts/123/integrations/1',
	has_customized_body_text: true,
	include_lists: ['https://api.aweber.com/1.0/accounts/123/lists/456'],
	is_archived: true,
	links: [
		{
			link_id: 1,
			total_clicks: 5,
			unique_clicks: 3,
			url: 'https://example.com/link1',
		},
		{
			link_id: 2,
			total_clicks: 8,
			unique_clicks: 6,
			url: 'https://example.com/link2',
		},
	],
	notify_on_send: true,
	opens_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts/3456789/opens',
	scheduled_for: '2017-11-15T15:46:07.926Z',
	segment_link: null,
	segment_name: 'my_segment',
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts/3456789',
	sent_at: '2025-05-06T21:22:03Z',
	stats: {
		num_complaints: 0,
		num_emailed: 1,
		num_undeliv: 0,
		unique_clicks: 1,
		unique_opens: 1,
	},
	status: 'admin_hold',
	subject: 'Weekly Recipes',
	twitter_integration: 'https://api.aweber.com/1.0/accounts/123/integrations/2',
}

export const broadcastCollectionMock = {
	entries: [broadcastMock],
	next_collection_link:
		'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts?status=sent&ws.size=1&ws.start=1',
	prev_collection_link:
		'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts?status=sent&ws.size=1&ws.start=0',
	resource_type_link: 'https://api.aweber.com/1.0/#broadcast-page-resource',
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts?status=sent&ws.size=1&ws.start=0',
	start: 0,
	total_size_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts/total?status=draft',
}

export const broadcastTotalMock = {
	total_size: 4,
}

export const scheduleBroadcastMock = {
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts/3456789',
}

export const cancelBroadcastMock = {
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/broadcasts/3456789',
}
