# How to start project

0. Install nodejs =16.x <18.x (maybe also 18+ but we didn't try) and docker
1. Run `cd currencies-api && docker-compose -f dbs.yml up` for PostgreSQL and admin for it;
2. Create `.env.dev`, `.env.test` (difference can be only in DB_DATABASE) from `.env-example`  and fill all it's values (check creds in `dbs.yml`);
3. Run `npm i` both in root and in `./currencies-api`
4. Start nodejs locally `npm run start.dev.watch`;
5. To seed database with mock data run `npm run seed` from root folder;
6. Try CRUDs from `localhost:PORT/`
7. Try to (note: you will have to change PORT to your port from .env file):

```bash
curl --location --request POST 'localhost:PORT/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "login": "LoginUser1",
    "password": "LoginUser1"
}'
```

8. Try to (note: you will have to change PORT and "Authorization" value):

```bash
curl --location --request GET 'localhost:PORT/user/list' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InVzZXIxIiwiaWF0IjoxNjc4MzYxOTk5LCJleHAiOjE2Nzg5NjY3OTl9.imPh5cxAQShZvJ0oaDPjMUI7n4F9_azcHWUHbKg5enQ' | json_pp
```
