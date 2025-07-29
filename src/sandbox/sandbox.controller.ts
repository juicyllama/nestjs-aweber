import { SandboxService } from './sandbox.service'
import { Controller, Get, Req } from '@nestjs/common'

@Controller('/app/aweber/sandbox')
export class SandboxController {
	constructor(private readonly sandboxService: SandboxService) {}

	@Get()
	async sandbox(@Req() req: any): Promise<{ url: string }> {
		return await this.sandboxService.run(req)
	}
}
