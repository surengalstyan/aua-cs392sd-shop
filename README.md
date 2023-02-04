
# Public Demo 

http://the-shop-ui.s3-website.eu-central-1.amazonaws.com/

API
https://aua-cs392sd-shop-api.onrender.com/

Source Code:
https://github.com/surengalstyan


# For local development

## 1. Download & install dependencies

- Node.js 18.14.0 https://nodejs.org/en/
- Postgres version 14/15 https://www.postgresql.org/download/

## 2. Initialize database

> **Note**
> You can skip this step if are willing to connect to the demo database on AWS. (Normally sensitive env variables should not be submitted. Just to avoid setting up DB locally.)

> Otherwise, make sure you have `server/.env` file and `DATABASE_URL` env var is set.

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
