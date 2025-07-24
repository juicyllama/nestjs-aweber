import { Controller, Post, Req } from '@nestjs/common'

@Controller('/app/aweber')
export class WebhookController {

	constructor(
	) {}

	@Post('/webhook')
	async callback(@Req() req: any): Promise<void> {

		console.log('AWeber Webhook received:', req.query, req.body);

		return

	}
}
