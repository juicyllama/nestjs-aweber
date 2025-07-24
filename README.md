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

1. Create AWeber App (or get credentials from existing app)
2. Add

```bash
zzz=xxxx

```

3. 

TODO:

### Oauth2

Once you have the module running in your app, it automatically exposes the endpoints required to connect via OAuth2

1. Visit: `/app/aweber/auth` and copy the URL
2. Open the URL in a browser window
TODO:


### Cache / Redis

As standard the app will use local memory for storing the OAuth Tokens which is not best practice as you will need to reauth each time you restart the service (and the memory is cleared).

We recommend using Redis which ships out of the box, all you need to provide are the following environment values and the cache will revert to redis.

```bash
REDIS_PORT=aaa
REDIS_HOST=
```

