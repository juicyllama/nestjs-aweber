import { AWeberSubscriber, AWeberSubscriberActivity } from './subscribers.types'

export const subscriberMock: AWeberSubscriber = {
	ad_tracking: 'ebook',
	area_code: 555,
	city: 'Chalfont',
	country: 'United States',
	custom_fields: {
		apple: 'fuji',
		pear: 'bosc',
	},
	dma_code: 504,
	email: 'user@example.com',
	id: 789,
	ip_address: '204.194.222.28',
	is_verified: true,
	last_followup_message_number_sent: 0,
	last_followup_sent_at: '2015-12-17T14:06:26.861089-05:00',
	last_followup_sent_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/campaigns/f12345678',
	latitude: 37.751,
	longitude: -97.822,
	misc_notes: 'ebook',
	name: 'John Doe',
	postal_code: '99999-9999',
	region: 'PA',
	resource_type_link: 'https://api.aweber.com/1.0/#subscriber',
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/subscribers/789',
	status: 'subscribed',
	subscribed_at: '2015-10-13T16:19:20-04:00',
	subscription_method: 'api',
	subscription_url: 'https://forms.aweber.com/form/16/123456789.htm',
	tags: ['slow', 'fast', 'lightspeed'],
	unsubscribe_method: 'unsubscribe link',
	unsubscribed_at: '2017-10-13T10:41:43.300889-04:00',
	verified_at: '2015-10-13T16:19:53',
	uuid: '123e4567-e89b-12d3-a456-426655440000',
}

export const subscriberActivityMock: AWeberSubscriberActivity = {
	event_time: '2015-07-31T15:36:34.000Z',
	http_etag: 'abd5e0fcbab9073cf861271845859008a7e1c750-ca5feee2b7fbb6febfca8af5541541ea960aaedb',
	id: 2701,
	resource_type_link: 'https://api.aweber.com/1.0/#subscriber_activity',
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/subscribers/789/subscribed',
	subscriber_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/subscribers/789',
	type: 'subscribed',
}

export const createSubscriberMock: AWeberSubscriber = {
	...subscriberMock,
	email: 'newuser@example.com',
	id: 790,
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/subscribers/790',
}

export const moveSubscriberMock = {
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/789/subscribers/790',
}

export const createPurchaseMock = {
	message: 'Purchase event created successfully',
}
