export type WebformType = 'inlineembed' | 'lightbox' | 'popup' | 'exitpopup' | 'slidein' | 'floatingbar'

export type AWeberWebform = {
	conversion_percentage: number
	html_source_link: string
	http_etag: string
	id: number
	is_active: boolean
	javascript_source_link: string
	name: string
	resource_type_link: string
	self_link: string
	tags: string[]
	total_displays: number
	total_submissions: number
	total_unique_displays: number
	type: WebformType
	unique_conversion_percentage: number
}

export type AWeberWebformSplitTest = {
	components_collection_link: string
	http_etag: string
	id: number
	is_active: boolean
	javascript_source_link: string
	name: string
	resource_type_link: string
	self_link: string
}

export type AWeberWebformSplitTestComponent = {
	conversion_percentage: number
	html_source_link: string
	http_etag: string
	id: string
	is_active: boolean
	javascript_source_link: string
	name: string
	resource_type_link: string
	self_link: string
	tags: string[]
	total_displays: number
	total_submissions: number
	total_unique_displays: number
	type: WebformType
	unique_conversion_percentage: number
	web_form_link: string
	weight: number
}
