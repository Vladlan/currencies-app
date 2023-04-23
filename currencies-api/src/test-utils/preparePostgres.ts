import { createSequelizeInstance } from '../databases/postgres/sequelize'

export async function preparePostgres() {
  try {
    return createSequelizeInstance()
  } catch (error) {
    console.error(error)
  }
}
