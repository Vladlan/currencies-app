import { Client } from 'pg'
import { test as testConfig } from '../sequelize-config'

export async function upsertDb() {
  const pg = new Client(testConfig.url)
  try {
    await pg.connect()
    const res = await pg.query(
      `SELECT datname FROM pg_catalog. pg_database WHERE lower(datname) = lower('${testConfig.database}');`,
    )
    if (res.rowCount === 0) {
      console.log(`Database ${testConfig.database} does not exist, creating...`)
      await pg.query(`CREATE DATABASE ${testConfig.database};`).catch((err) => {
        console.warn(`Failed to create database - ${testConfig.database}`, err)
      })
    }
  } catch (err) {
    console.warn('Failed to upsert postgres db', err)
  } finally {
    await pg.end()
  }
}

upsertDb()
