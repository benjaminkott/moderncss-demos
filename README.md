# Modern CSS Demos

Symfony app with demos of modern CSS features, at
<https://modern-css-demos.bk2k.info>.

## Development

DDEV (`.ddev/`): `ddev start`, then `ddev composer install` and
`npm install && npm run dev` (Webpack Encore).

## Hosting

Runs as the stack `moderncss-demos` on the ELITEDESK (see
`../elitedesk-hosting`), public through a Cloudflare Tunnel. **A push to
`master` deploys**: Komodo builds `infra/Dockerfile` (Encore assets and
Composer tree inside the image) and runs `infra/docker-compose.prod.yml`. No
database, no mail, no state; the only secret is `APP_SECRET`.

Locally, the same file:

```bash
APP_SECRET=x docker compose -f infra/docker-compose.prod.yml up -d --build   # http://localhost:3800
```
