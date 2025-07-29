export type LandingPageStatus = 'published' | 'draft' | 'unpublished'

export type AWeberLandingPage = {
	content_html: string
	published_html: string
	created_at: string
	id: string
	modified_at: string
	name: string
	published_at: string
	published_url: URL | string
	resource_type_link: URL | string
	self_link: URL | string
	status: LandingPageStatus
}
