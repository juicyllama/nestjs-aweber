import { AWeberSegment } from './segments.types'

export const segmentMock: AWeberSegment = {
	id: 1,
	is_split_test: false,
	name: 'All Subscribers',
	resource_type_link: 'https://api.aweber.com/1.0/#segment',
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/segments/1',
}

export const segmentsMock: AWeberSegment[] = [
	{
		id: 1,
		is_split_test: false,
		name: 'All Subscribers',
		resource_type_link: 'https://api.aweber.com/1.0/#segment',
		self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/segments/1',
	},
	{
		id: 2,
		is_split_test: true,
		name: 'Premium Subscribers',
		resource_type_link: 'https://api.aweber.com/1.0/#segment',
		self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/segments/2',
	},
	{
		id: 3,
		is_split_test: false,
		name: 'Active Subscribers',
		resource_type_link: 'https://api.aweber.com/1.0/#segment',
		self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/segments/3',
	},
]
