# Installation

- Extract the files in the Zip file.
- run in terminal "npm i".
- create database called "worlds"(in the psql commandline run this SQL command `CREATE DATABASE worlds`)
- The port to run on database is 3002.
- the port of backend is 3000
- Create .env file.
- Add these variables to the .env to connect to database:
  POSTGRES_HOST=127.0.0.1
  POSTGRES_DB=worlds
  POSTGRES_PORT=3002
  POSTGRES_TEST_DB=worlds
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=saif
  ENV=dev
  BCRYPT_PASSWORD=saif
  SALT_ROUNDS=10
  TOKEN_SECRET=learning
- Run "db-migrate up"
- Last Run Script "npm run watch".

# TESTING

- Create Database "testdb"(in the psql commandline run this SQL command `CREATE DATABASE testdb`).
- Run Script "npm run test".
