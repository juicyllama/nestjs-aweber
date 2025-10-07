import { LocalCacheService } from '../../config/cache/local.cache.service'
import { AUTH_REDIRECT_URI, OAUTH_CACHE_KEY } from './auth.constants'
import { AuthService } from './auth.service'
import { Controller, Get, Req, Res, UnauthorizedException } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/app/aweber/auth')
export class AuthController {
	constructor(
		private readonly localConfigService: LocalCacheService,
		private readonly authService: AuthService,
	) {}

	@Get()
	async getAuthUrl(@Req() req: Request, @Res() res: Response): Promise<void> {
		//Only allow this endpoint to be called if !token exists in cache
		if (!(await this.localConfigService.read(OAUTH_CACHE_KEY))) {
			const redirect_uri = `${req.protocol}://${req.get('Host')}/${AUTH_REDIRECT_URI}`
			return res.redirect(this.authService.getAuthorizationUrl(redirect_uri))
		}

		throw new UnauthorizedException(
			'AWeber OAuth access token already exists. Please clear tokens before requests a new authorization URL.',
		)
	}

	@Get('/callback')
	async callback(@Req() req: Request, @Res() res: Response): Promise<void> {
		const { code } = req.query as { code?: string }

		if (!code) {
			throw new UnauthorizedException('Authorization code is required')
		}

		// Exchange the authorization code for an access token
		const tokenResponse = await this.authService.exchangeCodeForToken(code)
		if (!tokenResponse) {
			throw new UnauthorizedException('Failed to obtain access token')
		}

		res.status(200).json({
			message: 'Authorization successful',
			access_token: tokenResponse,
		})
	}
}
