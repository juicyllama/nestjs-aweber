import { LocalCacheModule } from '../config/cache/local.cache.module'
import { AWeberConfigDto } from '../config/config.dto'
import { ConfigValidationModule } from '../config/config.module'
import { getConfigToken } from '../config/config.provider'
import { AccountsModule } from './accounts/accounts.module'
import { AuthModule } from './auth/auth.module'
import { BroadcastsModule } from './broadcasts/broadcasts.module'
import { CampaignsModule } from './campaigns/campaigns.module'
import { CustomFieldsModule } from './customFields/customFields.module'
import { IntegrationsModule } from './integrations/integrations.module'
import { LandingPagesModule } from './landingPages/landingPages.module'
import { ListsModule } from './lists/lists.module'
import { SegmentsModule } from './segments/segments.module'
import { SubscribersModule } from './subscribers/subscribers.module'
import { WebformsModule } from './webforms/webforms.module'
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager'
import { DynamicModule, Module, ModuleMetadata, Type } from '@nestjs/common'
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

export interface AWeberModuleOptions {
	config?: AWeberConfigDto
	configModule?: ConfigModuleOptions
	cacheModule?: CacheModuleOptions
}

export interface AWeberModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	inject?: any[]
	useFactory?: (...args: any[]) => Promise<AWeberModuleOptions> | AWeberModuleOptions
	useClass?: Type<AWeberModuleOptionsFactory>
	useExisting?: Type<AWeberModuleOptionsFactory>
	configModule?: ConfigModuleOptions
	cacheModule?: CacheModuleOptions
}

export interface AWeberModuleOptionsFactory {
	createAWeberOptions(): Promise<AWeberModuleOptions> | AWeberModuleOptions
}

@Module({})
export class AWeberModule {
	/**
	 * Create AWeber module with static configuration
	 */
	static forRoot(options: AWeberModuleOptions = {}): DynamicModule {
		const imports: any[] = []
		const providers: any[] = []

		// Add ConfigModule if configModule options are provided, otherwise use default
		if (options.configModule) {
			imports.push(ConfigModule.forRoot(options.configModule))
		} else {
			imports.push(
				ConfigModule.forRoot({
					isGlobal: true,
				}),
			)
		}

		// Add CacheModule if cacheModule options are provided, otherwise use default
		if (options.cacheModule) {
			imports.push(CacheModule.register(options.cacheModule))
		} else {
			imports.push(
				CacheModule.register({
					isGlobal: true,
				}),
			)
		}

		// Handle config validation
		if (options.config) {
			// If config is provided directly, validate it and provide it
			const token = getConfigToken(AWeberConfigDto)
			providers.push({
				provide: token,
				useFactory: async (): Promise<AWeberConfigDto> => {
					const inst = plainToInstance(AWeberConfigDto, options.config)
					const errors: ValidationError[] = await validate(inst)
					if (errors.length) {
						throw new Error(errors.map((e: ValidationError) => e.toString()).join('\n'))
					}
					return inst
				},
			})
		} else {
			// Use standard config validation from environment variables
			imports.push(ConfigValidationModule.register(AWeberConfigDto))
		}

		// Add all AWeber feature modules
		imports.push(
			AuthModule,
			LocalCacheModule,
			AccountsModule,
			BroadcastsModule,
			CampaignsModule,
			CustomFieldsModule,
			IntegrationsModule,
			LandingPagesModule,
			ListsModule,
			SegmentsModule,
			SubscribersModule,
			WebformsModule,
		)

		return {
			module: AWeberModule,
			imports,
			providers,
			exports: [
				AuthModule,
				AccountsModule,
				BroadcastsModule,
				CampaignsModule,
				CustomFieldsModule,
				IntegrationsModule,
				LandingPagesModule,
				ListsModule,
				SegmentsModule,
				SubscribersModule,
				WebformsModule,
			],
		}
	}

	/**
	 * Create AWeber module with async configuration
	 */
	static forRootAsync(options: AWeberModuleAsyncOptions): DynamicModule {
		const imports: any[] = [...(options.imports || [])]

		// Add ConfigModule if configModule options are provided, otherwise use default
		if (options.configModule) {
			imports.push(ConfigModule.forRoot(options.configModule))
		} else {
			imports.push(
				ConfigModule.forRoot({
					isGlobal: true,
				}),
			)
		}

		// Add CacheModule if cacheModule options are provided, otherwise use default
		if (options.cacheModule) {
			imports.push(CacheModule.register(options.cacheModule))
		} else {
			imports.push(
				CacheModule.register({
					isGlobal: true,
				}),
			)
		}

		// Add all AWeber feature modules
		imports.push(
			AuthModule,
			LocalCacheModule,
			AccountsModule,
			BroadcastsModule,
			CampaignsModule,
			CustomFieldsModule,
			IntegrationsModule,
			LandingPagesModule,
			ListsModule,
			SegmentsModule,
			SubscribersModule,
			WebformsModule,
		)

		const providers: any[] = []

		// Handle async configuration
		if (options.useFactory) {
			const optionsToken = 'AWEBER_MODULE_OPTIONS'
			const configToken = getConfigToken(AWeberConfigDto)

			providers.push({
				provide: optionsToken,
				useFactory: options.useFactory,
				inject: options.inject || [],
			})

			providers.push({
				provide: configToken,
				useFactory: async (moduleOptions: AWeberModuleOptions): Promise<AWeberConfigDto> => {
					if (moduleOptions.config) {
						// Use provided config
						const inst = plainToInstance(AWeberConfigDto, moduleOptions.config)
						const errors: ValidationError[] = await validate(inst)
						if (errors.length) {
							throw new Error(errors.map((e: ValidationError) => e.toString()).join('\n'))
						}
						return inst
					} else {
						// Fallback to environment variables
						await ConfigModule.envVariablesLoaded
						const inst = plainToInstance(AWeberConfigDto, process.env)
						const errors: ValidationError[] = await validate(inst)
						if (errors.length) {
							throw new Error(errors.map((e: ValidationError) => e.toString()).join('\n'))
						}
						return inst
					}
				},
				inject: [optionsToken],
			})
		} else {
			// For useClass and useExisting, we'll use the standard config validation
			imports.push(ConfigValidationModule.register(AWeberConfigDto))
		}

		if (options.useClass) {
			providers.push({
				provide: 'AWEBER_MODULE_OPTIONS',
				useClass: options.useClass,
			})
		}

		if (options.useExisting) {
			providers.push({
				provide: 'AWEBER_MODULE_OPTIONS',
				useExisting: options.useExisting,
			})
		}

		return {
			module: AWeberModule,
			imports,
			providers,
			exports: [
				AuthModule,
				AccountsModule,
				BroadcastsModule,
				CampaignsModule,
				CustomFieldsModule,
				IntegrationsModule,
				LandingPagesModule,
				ListsModule,
				SegmentsModule,
				SubscribersModule,
				WebformsModule,
			],
		}
	}

	/**
	 * Simple register method for basic configuration
	 */
	static register(options: AWeberModuleOptions = {}): DynamicModule {
		return this.forRoot(options)
	}
}
