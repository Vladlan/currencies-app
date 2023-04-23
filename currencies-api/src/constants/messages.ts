export const SERVER_START_MSG = (port: number, host = '') =>
  `Server is listening on port ${host}:${port}`
export const NO_ENV_MSG = "⚠️  Couldn't find .env file  ⚠️"
export const NO_JWT_SECRET_MSG =
  '⚠️  JWT_SECRET has not been specified in .env file  ⚠️'
export const NO_JWT_ALGORITHM_MSG =
  '⚠️  JWT_ALGORITHM has not been specified in .env file  ⚠️'
export const NO_PASSWORD_HASH_SALT_MSG =
  '⚠️  PASSWORD_HASH_SALT has not been specified in .env file  ⚠️'
export const INTERNAL_SERVER_ERROR_MSG = 'Internal Server Error'
export const LOGGER_MSG = (timeMark: string, level: string, msg: string) =>
  `${timeMark} [${level}]: ${msg}`

export const USER_MSGS = {
  created: (login: string) => `User ${login} has been created`,
  updated: (id: string) => `User '${id}' has been updated`,
  deleted: (login: string) => `User ${login} has been deleted`,
  notExists: (userId: string) => `User with id:${userId} does not exists`,
  loginAlreadyExists: (login: string) =>
    `User with login:${login} already exists`,
  createFail: 'Failed to create user',
  createUsersFail: 'Failed to create users',
  updateFail: 'Failed to update user',
  deleteFail: 'Failed to delete user',
  noUsers: 'No users',
  notAllDataProvided: 'Not all data has been provided',
}

export const AUTH_MSGS = {
  loginOrPasswordAreWrong: 'Login or password are wrong',
  authTokenIsNotValid: 'Auth token is not valid',
}
