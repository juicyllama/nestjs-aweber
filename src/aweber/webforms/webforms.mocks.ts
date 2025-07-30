import { AWeberWebform, AWeberWebformSplitTest, AWeberWebformSplitTestComponent } from './webforms.types'

export const webformMock: AWeberWebform = {
	conversion_percentage: 6.451612903225806,
	html_source_link: 'http://forms.aweber.com/form/123/456.html',
	http_etag: '"902ba3cda1883801594b6e1b452790cc53948fda-f83cb0ac22a8d5f792417f9b3dc0e9dc7558aa32"',
	id: 234,
	is_active: true,
	javascript_source_link: 'http://forms.aweber.com/form/123/456.js',
	name: "Joker's Wild",
	resource_type_link: 'https://api.aweber.com/1.0/#web_form',
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/web_forms/789',
	tags: ['slow', 'fast', 'lightspeed'],
	total_displays: 123456789,
	total_submissions: 123456,
	total_unique_displays: 1234,
	type: 'exitpopup',
	unique_conversion_percentage: 6.451612903225806,
}

export const webformSplitTestMock: AWeberWebformSplitTest = {
	components_collection_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/web_form_split_tests/789/components',
	http_etag: '"902ba3cda1883801594b6e1b452790cc53948fda-f83cb0ac22a8d5f792417f9b3dc0e9dc7558aa32"',
	id: 234,
	is_active: true,
	javascript_source_link: 'http://forms.aweber.com/form/123/split_456.js',
	name: "Joker's Wild Split Test",
	resource_type_link: 'https://api.aweber.com/1.0/#web_form_split_test',
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/web_form_split_tests/789',
}

export const webformSplitTestComponentMock: AWeberWebformSplitTestComponent = {
	conversion_percentage: 0,
	html_source_link: 'http://forms.aweber.com/form/123/456.html',
	http_etag: '"902ba3cda1883801594b6e1b452790cc53948fda-f83cb0ac22a8d5f792417f9b3dc0e9dc7558aa32"',
	id: '234-456',
	is_active: true,
	javascript_source_link: 'http://forms.aweber.com/form/123/456.js',
	name: "Joker's Wild",
	resource_type_link: 'https://api.aweber.com/1.0/#component',
	self_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/web_form_split_tests/789/component/234-456',
	tags: ['slow', 'fast', 'lightspeed'],
	total_displays: 123456789,
	total_submissions: 123456,
	total_unique_displays: 1234,
	type: 'exitpopup',
	unique_conversion_percentage: 6.451612903225806,
	web_form_link: 'https://api.aweber.com/1.0/accounts/123/lists/456/web_form/789',
	weight: 40,
}
