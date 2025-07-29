import {
	AWeberCampaign,
	AWeberCampaignCollection,
	AWeberCampaignStats,
	AWeberCampaignStatistic,
} from './campaigns.types'

export const campaignMock: AWeberCampaign = {
	campaign_type: 'b',
	click_tracking_enabled: true,
	content_type: 'Text',
	id: 1234567,
	is_archived: true,
	links_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/campaigns/b3456789/links',
	message_interval: 1,
	message_number: 1,
	resource_type_link: 'https://api.aweber.com/1.0/#broadcast_campaign',
	scheduled_at: '2017-07-18 16:53:02-04:00',
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/campaigns/b3456789',
	sent_at: '2017-07-18 16:53:07-04:00',
	spam_assassin_score: 2.1,
	stats_collection_link: 'https://api.aweber.com/1.0/accounts/accounts/123/lists/456/campaigns/b3456789/stats',
	subject: 'Weekly Recipes',
	total_clicks: 0,
	total_opens: 0,
	total_sent: 0,
	total_spam_complaints: 0,
	total_undelivered: 0,
	total_unsubscribes: 0,
	twitter_account_link: 'https://api.aweber.com/1.0/account/123/integrations/456',
}

export const campaignCollectionMock: AWeberCampaignCollection = {
	entries: [campaignMock],
	next_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/campaigns?ws.start=101&ws.size=100',
	prev_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/campaigns?ws.start=0&ws.size=100',
	start: 0,
	total_size: 0,
}

export const campaignStatsCollectionMock: AWeberCampaignStats = {
	entries: [
		{
			description:
				'total number of times a subscriber clicked any link appearing in your campaign except the unsubscribe link (includes multiple clicks of the same link)',
			id: 'total_clicks',
			resource_type_link: 'https://api.aweber.com/1.0/#integer_stat',
			self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/campaigns/b789/stats/total_clicks',
			value: 21,
		},
		{
			description:
				'total number of unique subscribers who clicked any link appearing in your campaign except the unsubscribe link',
			id: 'unique_clicks',
			resource_type_link: 'https://api.aweber.com/1.0/#integer_stat',
			self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/campaigns/b789/stats/unique_clicks',
			value: 15,
		},
	],
	next_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/campaigns/b789/stats?ws.start=2&ws.size=1',
	prev_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/campaigns/b789/stats?ws.start=0&ws.size=1',
	resource_type_link: 'https://api.aweber.com/1.0/#stat-page-resource',
	start: 1,
	total_size: 10,
}

export const campaignStatisticMock: AWeberCampaignStatistic = {
	description:
		'total number of times a subscriber clicked any link appearing in your campaign except the unsubscribe link (includes multiple clicks of the same link)',
	id: 'total_clicks',
	resource_type_link: 'https://api.aweber.com/1.0/#integer_stat',
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/campaigns/b789/stats/total_clicks',
	value: 21,
}
