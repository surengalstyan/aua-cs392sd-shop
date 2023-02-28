
# Public Demo 

UI: https://aua-cs392sd-shop-ui.onrender.com

API: https://aua-cs392sd-shop-api.onrender.com

Source Code: https://github.com/surengalstyan/aua-cs392sd-shop


# For local development

## 1. Download & install dependencies

- Node.js 18.14.0 https://nodejs.org/en/
- Postgres version 14/15 https://www.postgresql.org/download/
- MongoDB version 5

## 2. Initialize database

> **Note**
> You can skip this step if are willing to connect to the demo database on AWS and Atlas.

> Otherwise, make sure you have `server/.env` file and `POSTGRES_DATABASE_URL` & `MONGODB_DATABASE_URL` env var are set.

### Initialize schema

```sh
npm run database:migrate
```

### Initialize DB with seed data

```sh
npm run database:seed
```

## 3. Run Server

```sh
cd server
npm i
npm run dev
```

## 4. Run Client

```sh
cd client
npm i
npm run dev
```

## 5. Navigate to http://127.0.0.1:5173/
