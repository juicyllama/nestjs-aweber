import { Injectable, Logger } from '@nestjs/common'
import { InjectConfig } from '../../config/config.provider'
import { AWeberConfigDto } from '../../config/config.dto'
import { AWeberOAuthInterface } from './auth.interface'
import { AWEBER_OAUTH_URL, AWEBER_TOKEN_URL, OAUTH_CACHE_KEY } from './auth.constants'
import { LocalCacheService } from '../../config/cache/local.cache.service'

interface TokenResponse {
	access_token: string
	refresh_token: string
	token_type: string
	expires_in: number
	scope?: string
}

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name)

	constructor(
		@InjectConfig(AWeberConfigDto) private readonly config: AWeberConfigDto,
		private readonly localConfigService: LocalCacheService,
	) {}

	async accessToken(): Promise<string> {
		const cachedOAuth = await this.localConfigService.read(OAUTH_CACHE_KEY)

		// Check if we have valid cached tokens
		if (cachedOAuth && cachedOAuth.refresh_token) {
			// Check if token is still valid (with 5 minute buffer)
			const expiresAt = new Date(cachedOAuth.expires_at)
			const now = new Date()
			const bufferTime = 5 * 60 * 1000 // 5 minutes in milliseconds
			
			if (expiresAt.getTime() > now.getTime() + bufferTime) {
				this.logger.debug('Using cached access token')
				return cachedOAuth.access_token
			}

			// Token is expired, refresh it
			this.logger.debug('Access token expired, refreshing...')
			try {
				const tokenResponse = await this.refreshAccessToken(cachedOAuth.refresh_token)
				const newOAuth = await this.saveTokenResponse(tokenResponse)
				return newOAuth.access_token
			} catch (error) {
				this.logger.error('Failed to refresh token:', error)
				throw new Error('Failed to refresh AWeber access token')
			}
		}

		throw new Error('No valid AWeber tokens found. Please authorize the application first.')
	}

	/**
	 * Get the authorization URL for OAuth2 flow
	 * This would typically be used in a controller to redirect users for authorization
	 */
	getAuthorizationUrl(redirectUri: string, state?: string): string {
		const scopes = [
			'account.read',
			'list.read',
			'list.write',
			'subscriber.read',
			'subscriber.write',
			'email.read',
			'email.write',
			'subscriber.read-extended',
			'landing-page.read'
		]

		const params = new URLSearchParams({
			response_type: 'code',
			client_id: this.config.AWEBER_CLIENT_ID,
			redirect_uri: redirectUri,
			scope: scopes.join(' '),
			state: state || Date.now().toString(),
		})

		return `${AWEBER_OAUTH_URL}/authorize?${params.toString()}`
	}

	/**
	 * Exchange authorization code for access token
	 * This would typically be called from a callback controller
	 */
	async exchangeCodeForToken(code: string): Promise<string> {
		try {
			const tokenResponse = await this.requestAccessToken({
				grant_type: 'authorization_code',
				code,
			})
			const oauth = await this.saveTokenResponse(tokenResponse)
			
			this.logger.debug('Successfully exchanged authorization code for tokens', oauth)
			return oauth.access_token
		} catch (error) {
			this.logger.error('Failed to exchange authorization code:', error)
			throw new Error('Failed to exchange authorization code for AWeber access token')
		}
	}

	/**
	 * Refresh an access token using the refresh token
	 */
	private async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
		return this.requestAccessToken({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
		})
	}

	/**
	 * Make a token request to AWeber's OAuth2 endpoint
	 */
	private async requestAccessToken(params: Record<string, string>): Promise<TokenResponse> {
		const credentials = Buffer.from(`${this.config.AWEBER_CLIENT_ID}:${this.config.AWEBER_CLIENT_SECRET}`).toString('base64')
		
		const response = await fetch(AWEBER_TOKEN_URL, {
			method: 'POST',
			headers: {
				'Authorization': `Basic ${credentials}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams(params).toString(),
		})

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`Token request failed: ${response.status} - ${errorText}`)
			throw new Error(`Token request failed: ${response.status}`)
		}

		const tokenResponse: TokenResponse = await response.json()
		return tokenResponse
	}

	/**
	 * Save token response to cache
	 */
	private async saveTokenResponse(tokenResponse: TokenResponse): Promise<AWeberOAuthInterface> {
		const expiresAt = new Date()
		expiresAt.setSeconds(expiresAt.getSeconds() + tokenResponse.expires_in)

		const oauth: AWeberOAuthInterface = {
			access_token: tokenResponse.access_token,
			refresh_token: tokenResponse.refresh_token,
			token_type: tokenResponse.token_type,
			expires_at: expiresAt,
			scope: tokenResponse.scope ? tokenResponse.scope.split(' ') : [],
		}

		// Cache for the token lifetime
		await this.localConfigService.write(OAUTH_CACHE_KEY, oauth)
		return oauth
	}

	/**
	 * Clear cached tokens (useful for logout)
	 */
	async clearTokens(): Promise<void> {
		await this.localConfigService.del(OAUTH_CACHE_KEY)
		this.logger.debug('Cleared cached AWeber tokens')
	}
}
