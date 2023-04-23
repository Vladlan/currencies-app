const dotenv = require('dotenv')
const path = require('path')

if (!process.env.NODE_ENV) throw new Error('NODE_ENV is not defined')

const env = dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
}).parsed

const config = {
  database: env.DB_DATABASE,
  dialect: env.DB_DIALECT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  port: Number.parseInt(env.DB_PORT || '3000', 10),
  host: env.DB_HOST,
  node_env: env.NODE_ENV,
  url: `${env.DB_DIALECT}://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`,
}

// "development", "test", "production" only for sequelize-cli
module.exports = {
  development: config,
  test: config,
  production: config,
  config,
}
