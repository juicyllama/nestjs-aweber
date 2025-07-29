export type AWeberAccount = {
	analytics_src: string //The URL to the AWeber analytics script
	http_etag: string //The HTTP ETag for the account resource
	id: number //The unique identifier for the account
	integrations_collection_link: string //The link to the account's integrations collection
	lists_collection_link: string //The link to the account's lists collection
	resource_type_link: string //The link to the account resource type
	self_link: string //The link to the account resource itself
	uuid: string //The universally unique identifier for the account
	company: string //The name of the account
}
