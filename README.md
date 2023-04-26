#How to start Currencies App locally

1. `npm i`
2. `cd currencies-api && npm i`
3. `cd currencies-front && npm i`
4. In `currencies-api` from `.env-example` create `.env.dev` and add `CURRENCY_API_KEY` to it
5. In `currencies-api` run `docker-compose -f dbs.yml up` to up PostgreSQL
6. In `currencies-api` run `npm run start.dev.watch` to up currencies-api in dev and watch mode
7. In `currencies-api` run `npm run seed.dev` to fill Postgres with user
8. On `localhost:4200/api-docs` check `login` with default values in swagger - JWT Bearer token should be returned. Use this user in `currencies-front`
9. In `currencies-front` run `npm run dev`

