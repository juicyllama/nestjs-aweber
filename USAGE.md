# AWeber Module Usage Examples

The AWeber module now supports multiple configuration patterns to accommodate different NestJS application setups.

## 1. Basic Usage (Default Configuration)

For simple applications using the standard `.env` file:

```typescript
import { AWeberModule } from '@juicyllama/nestjs-aweber'

@Module({
  imports: [
    AWeberModule.forRoot(),
    // or
    AWeberModule.register(),
  ],
})
export class AppModule {}
```

## 2. Direct Configuration

For applications that want to pass configuration values directly without using environment variables:

```typescript
import { AWeberModule } from '@juicyllama/nestjs-aweber'

@Module({
  imports: [
    AWeberModule.forRoot({
      config: {
        AWEBER_CLIENT_ID: 'your-client-id',
        AWEBER_CLIENT_SECRET: 'your-client-secret',
      },
    }),
  ],
})
export class AppModule {}
```

## 3. Custom Configuration File Paths

For applications that need custom environment file paths:

```typescript
import { AWeberModule } from '@juicyllama/nestjs-aweber'
import { Logger } from '@nestjs/common'

@Module({
  imports: [
    AWeberModule.forRoot({
      configModule: {
        isGlobal: true,
        envFilePath: ((): string => {
          const nodeEnv = process.env['NODE_ENV']
          let envFilePath = ''
          switch (nodeEnv) {
            case 'production':
              envFilePath = 'apps/core/.env.production'
              break
            case 'staging':
              envFilePath = 'apps/core/.env.stage'
              break
            case 'test':
              envFilePath = 'apps/core/.env.test'
              break
            case 'local':
              envFilePath = 'apps/core/.env.local'
              break
            default:
              envFilePath = 'apps/core/.env'
              break
          }
          Logger.log(`Loading env variables from: ${envFilePath}`)
          return envFilePath
        })(),
        validate: validateEnv,
      },
    }),
  ],
})
export class AppModule {}
```

## 4. Custom Cache Configuration

For applications that need custom cache configuration (e.g., Redis):

```typescript
import { AWeberModule } from '@juicyllama/nestjs-aweber'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AWeberModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisUri = configService.get<string>('REDIS_URI')
        
        return {
          cacheModule: redisUri ? {
            isGlobal: true,
            stores: [new KeyvRedis(redisUri)],
          } : {
            isGlobal: true, // fallback to default memory cache
          },
        }
      },
    }),
  ],
})
export class AppModule {}
```

## 4.5. Direct Configuration with Async

For applications that want to provide configuration directly through an async factory:

```typescript
import { AWeberModule } from '@juicyllama/nestjs-aweber'

@Module({
  imports: [
    AWeberModule.forRootAsync({
      useFactory: async () => ({
        config: {
          AWEBER_CLIENT_ID: 'async-client-id',
          AWEBER_CLIENT_SECRET: 'async-client-secret',
        },
        cacheModule: {
          isGlobal: true,
        },
      }),
    }),
  ],
})
export class AppModule {}
```

## 5. Complete Async Configuration

For complex applications that need both custom config and cache setup:

```typescript
import { AWeberModule } from '@juicyllama/nestjs-aweber'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    AWeberModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV')
        const redisUri = configService.get<string>('REDIS_URI')
        
        return {
          configModule: {
            isGlobal: true,
            envFilePath: `apps/core/.env.${nodeEnv || 'local'}`,
            validate: validateEnv,
          },
          cacheModule: redisUri ? {
            isGlobal: true,
            stores: [new KeyvRedis(redisUri)],
          } : {
            isGlobal: true,
          },
        }
      },
    }),
  ],
})
export class AppModule {}
```

## 6. Using a Factory Class

For more complex configurations, you can use a factory class:

```typescript
import { AWeberModule, AWeberModuleOptionsFactory, AWeberModuleOptions } from '@juicyllama/nestjs-aweber'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AWeberConfigFactory implements AWeberModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createAWeberOptions(): AWeberModuleOptions {
    const environment = this.configService.get<string>('NODE_ENV')
    const redisUri = this.configService.get<string>('REDIS_URI')
    
    return {
      configModule: {
        isGlobal: true,
        envFilePath: `apps/core/.env.${environment || 'local'}`,
      },
      cacheModule: redisUri ? {
        isGlobal: true,
        stores: [new KeyvRedis(redisUri)],
      } : {
        isGlobal: true,
      },
    }
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AWeberModule.forRootAsync({
      imports: [ConfigModule],
      useClass: AWeberConfigFactory,
    }),
  ],
  providers: [AWeberConfigFactory],
})
export class AppModule {}
```

## Environment Variables

The module still requires the following environment variables to be set:

```bash
AWEBER_CLIENT_ID=your_aweber_client_id
AWEBER_CLIENT_SECRET=your_aweber_client_secret
```

These can be provided through any of the configuration methods above.

## Migration from Previous Version

If you were using the module before this update, you can continue using it without any changes by simply calling:

```typescript
// Old way - still works
@Module({
  imports: [AWeberModule],
})

// New way - equivalent
@Module({
  imports: [AWeberModule.forRoot()],
})
```

The old static module definition has been replaced with the new flexible configuration system, but backward compatibility is maintained through the default `forRoot()` behavior.