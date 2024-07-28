```bash

bunx astro add vercel


bunx prisma migrate

bunx prisma db seed

bunx astro:env getSecret

```

```bash
docker compose up -d --build --force-recreate

docker compose exec -it app /bin/sh

cp .env.example .env
# sed -i 's/localhost/db/g' .env
export DATABASE_URL=postgresql://ravuthz:PngyilD3k2cY@ep-young-bird-348559.ap-southeast-1.aws.neon.tech/blog-api

# bunx prisma generate --schema=./alternative/schema.prisma
bunx prisma migrate
bunx prisma db seed

```
