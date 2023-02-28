
# Public Demo 

UI: https://aua-cs392sd-shop-ui.onrender.com

API: https://aua-cs392sd-shop-api.onrender.com

Source Code: https://github.com/surengalstyan/aua-cs392sd-shop


## 1. Download & install dependencies

- Node.js 18.14.0 https://nodejs.org/en/
- Postgres version 14/15 https://www.postgresql.org/download/
- MongoDB version 5 https://www.mongodb.com/try/download/community

## 2. Initialize database

Create `server/.env` file and set `POSTGRES_DATABASE_URL` & `MONGODB_DATABASE_URL` env vars.

```sh
cd server
npm i
npm run database:migrate
npm run database:seed
```

## 3. Run Server

```sh
npm run dev
```

## 4. Run Client

```sh
cd client
npm i
npm run dev
```
