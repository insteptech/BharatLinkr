# Hcceco-api

## Setup

- Setup your aws credentials and aws profile using `aws configure --profile <aws profile>`
- `npm install`
- use `yarn start` to run`
- use `yarn db:migrate` for migrate database
- use `yarn db:create` for create database
- use `yarn db:seeds` for insert seed data
- use `yarn lint:fix` for fix the lint erroe

## Environment variables

- Environment variables can be setup in `.env.development` file
- add your `CREDENTIALS` to a .env.development file Like

# Port number
PORT=3000
NODE_ENV=development

# PROXY APIS
PROXY_BASE_API_URL=http://********/
CLIENT_ID=**********
CLIENT_SECRET=********

# JWT
# JWT secret key
JWT_SECRET=********
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_TIME=8h

DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=******
DB_NAME=officeBanao
DB_PORT=5432
DB_DIALECT=postgres

