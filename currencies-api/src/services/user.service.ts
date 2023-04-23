import { Op } from 'sequelize'
import { EXCLUDE_TIMESTAMPS, SCOPE_FULL, USER_MSGS } from '../constants'
import { IUserCreate, IUserUpdate } from '../types'
import { generateQueryByIds } from '../utils'
import { User as UserModel } from '../databases/postgres/models'

class UserService {
  async createUser(newUser: IUserCreate) {
    const [user, created] = await UserModel.findOrCreate({
      where: { login: newUser.login },
      defaults: {
        login: newUser.login,
        password: newUser.password,
        age: newUser.age,
      },
    })
    if (created) return user
    throw new Error(USER_MSGS.loginAlreadyExists(newUser.login))
  }

  async createUsers(newUsers: IUserCreate[]) {
    const createdUsers = await UserModel.bulkCreate(newUsers)
    if (createdUsers) {
      const createdUsersValues = createdUsers.map(
        (userMod) => userMod.dataValues,
      )
      return createdUsersValues
    }
    throw new Error(USER_MSGS.createUsersFail)
  }

  async getUsers(ids?: string[]) {
    const query = generateQueryByIds(ids)
    const users = await UserModel.scope(SCOPE_FULL).findAll(query)
    if (users) return users
    throw new Error(USER_MSGS.noUsers)
  }

  async deleteUsers(ids?: string[]) {
    let query
    if (ids) {
      query = generateQueryByIds(ids)
    }
    query = query || { where: {} }
    const deleteResult = await UserModel.destroy(query)

    return deleteResult
  }

  async findUserById(userId: string) {
    const user = await UserModel.findByPk(userId, EXCLUDE_TIMESTAMPS)
    if (user) return user
    throw new Error(USER_MSGS.notExists(userId))
  }

  async getSuggestedUsers(loginSubstring: string, limit: number) {
    const suggestedUsers = await UserModel.findAll({
      where: {
        login: {
          [Op.iLike]: `%${loginSubstring}%`,
        },
      },
      limit,
    })
    return suggestedUsers
  }

  async updateUser(userToUpdate: IUserUpdate) {
    const user = await UserModel.findOne({
      where: { id: userToUpdate.id },
    })
    if (user) {
      const updatedUser = await user.update(userToUpdate)
      return updatedUser
    }
    throw new Error(USER_MSGS.updateFail)
  }

  async deleteUser(userId: string) {
    const user = await UserModel.findOne({
      where: { id: userId },
    })
    if (user) {
      const deletedUser = { login: user.dataValues.login }
      await user.destroy()
      return deletedUser
    }
    throw new Error(USER_MSGS.deleteFail)
  }
}

export const userService = new UserService()
