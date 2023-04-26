import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import {
  ENV_TEST,
  NO_ENV_MSG,
  NO_JWT_ALGORITHM_MSG,
  NO_JWT_SECRET_MSG,
  NO_PASSWORD_HASH_SALT_MSG,
} from '../../constants'
import * as models from './models'

import config from '../../../sequelize-config'

if (!config) {
  throw new Error(NO_ENV_MSG)
}

if (!process.env.JWT_SECRET) {
  throw new Error(NO_JWT_SECRET_MSG)
}

if (!process.env.JWT_ALGORITHM) {
  throw new Error(NO_JWT_ALGORITHM_MSG)
}

if (!process.env.PASSWORD_HASH_SALT) {
  throw new Error(NO_PASSWORD_HASH_SALT_MSG)
}

export const createSequelizeInstance = (
  options?: SequelizeOptions | undefined,
) => {
  const defaultOptions = {
    ...config,
    models: Object.values(models),
    logging: process.env.NODE_ENV !== ENV_TEST,
  }
  return new Sequelize(options || defaultOptions)
}

export const SequelizeInstance = createSequelizeInstance()
