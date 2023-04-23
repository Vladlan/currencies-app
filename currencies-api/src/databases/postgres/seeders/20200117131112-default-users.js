'use strict'
const { users } = require('../seeds-data/users')

// NOTE: all passwords equals logins
// password hashes were created by hashSync(password, salt)
// salt were created genSaltSync(12) (https://www.npmjs.com/package/bcrypt)
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', users, { ignoreDuplicates: true })
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
