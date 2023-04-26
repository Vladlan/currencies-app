const { hashSync } = require('bcrypt')
const path = require('node:path')
const envPath = path.resolve(
  __dirname,
  `./../../../../.env.${process.env.NODE_ENV}`,
)
const env = require('dotenv').config({
  path: envPath,
}).parsed

const users = [
  {
    id: '6b69958e-dc25-44f6-afd9-50de4bafb853',
    login: 'LoginUser1',
  },
].map((usr) => {
  return {
    ...usr,
    password: hashSync(usr.login, env.PASSWORD_HASH_SALT),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})

module.exports = {
  users,
}
