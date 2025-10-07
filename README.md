<p align="center">
  <a href="https://juicyllama.com/" target="_blank">
    <img src="https://juicyllama.com/assets/images/icon.png" width="100" alt="JuicyLlama Logo" />
  </a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>



<p align="center">
A NestJS app for integrating with AWeber API
</p>

<h2 align="center">
Sponsored By
</h2>

<p align="center">
  <a href="https://clicktech.com/" target="_blank">
    <img src="https://clicktech.com/wp-content/uploads/2024/07/clicktech-logo.png" alt="ClickTech Logo" />
  </a>
</p>
<p align="center">
Clicktech help businesses succeed online.
</p>
<p align="center">
Their mission is to make digital marketing accessible and more cost-effective for all businesses, regardless of size.
</p>
<p align="center">
Through their network of platforms, integrated partners, and educational resources, they aim to create a meaningful economic impact by helping millions of businesses succeed online.
</p>

## Install

```bash
npm i @juicyllama/nestjs-aweber
```

## Usage

1. Create an AWeber App (or get credentials from existing app)

```bash
# .env
AWEBER_CLIENT_ID=your_aweber_client_id
AWEBER_CLIENT_SECRET=your_aweber_client_secret
```

2. Import the AWeber module into your NestJS application

### Basic Usage

```typescript
import { AWeberModule } from '@juicyllama/nestjs-aweber'

@Module({
  imports: [
    AWeberModule.forRoot(),
  ],
})
export class AppModule {}
```

### Advanced Configuration

For applications with custom environment file paths or caching strategies:

```typescript
import { AWeberModule } from '@juicyllama/nestjs-aweber'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    AWeberModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        configModule: {
          isGlobal: true,
          envFilePath: `apps/core/.env.${process.env.NODE_ENV || 'local'}`,
        },
        cacheModule: {
          isGlobal: true,
          // Custom cache configuration here
        },
      }),
    }),
  ],
})
export class AppModule {}
```

See [USAGE.md](./USAGE.md) for more detailed configuration examples.

3. Authenticate your NestJS app with Aweber (OAuth2)

4. Use the AWeber services in your application

You can checkout the [Sandbox](./src/sandbox/) for an example implementation.

### Oauth2

Once you have the module running in your app, it automatically exposes the endpoints required to connect via OAuth2

Visit: `/app/aweber/auth` and connect to your AWeber account

### Cache / Redis

As standard the app will use local memory for storing the OAuth Tokens which is not best practice as you will need to reauth each time you restart the service (and the memory is cleared).

We recommend using Redis which ships out of the box, provide your redis environment values and the cache will revert to redis.

```bash
REDIS_URI=redis://localhost:6379
```

## Types

We have typed each AWeber Resource type and have exported them for your use. 

You can import them into your code and reuse them.

## Testing

We are using mock data (mirrored from the AWeber documentation) to perform testing.

## Webhooks

This API wrapper does not support webhooks and you should integrate them directly into your application using [AWeber Webhooks Docs](https://api.aweber.com/#section/Getting-Started)