import { Client } from 'pg'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { createSequelizeInstance } from '../src/databases/postgres/sequelize'
const env = dotenv.config({
  path: path.resolve(__dirname, `./../.env.test`),
}).parsed

const createDb = async (pg: Client) => {
  await pg.query(`CREATE DATABASE ${env?.DB_DATABASE};`).catch((err) => {
    console.warn(`Failed to create database - ${env?.DB_DATABASE}`, err)
  })
  console.log(`Database ${env?.DB_DATABASE} created`)
}

export async function recreateDb() {
  const pgConfig = {
    host: env?.DB_HOST,
    port: Number.parseInt(env?.DB_PORT || '3000', 10),
    user: env?.DB_USER,
    password: env?.DB_PASSWORD,
  }
  const pg = new Client(pgConfig)
  try {
    await pg.connect()
    const res = await pg.query(
      `SELECT datname FROM pg_catalog. pg_database WHERE lower(datname) = lower('${env?.DB_DATABASE}');`,
    )
    if (res.rowCount === 0) {
      console.log(`Database ${env?.DB_DATABASE} does not exist, creating...`)
      await createDb(pg)
    } else {
      await pg.query(`DROP DATABASE ${env?.DB_DATABASE}`)
      await createDb(pg)
    }
    await createDbRelationTables()
  } catch (err) {
    console.warn(`Failed to recreate ${env?.DB_DATABASE} db`, err)
  } finally {
    await pg.end()
    console.log('recreateDb - finished')
  }
}

async function createDbRelationTables() {
  const SequelizeInstance = createSequelizeInstance()
  try {
    await SequelizeInstance.sync({ force: true })
  } catch (err) {
    console.warn('Failed to create db relation tables', err)
  } finally {
    console.log('createDbRelationTables - finished')
    await SequelizeInstance.close()
  }
}

recreateDb()
