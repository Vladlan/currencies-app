import { preparePostgres } from '../../test-utils/preparePostgres'
import { IUser } from '../../types'
import { userService } from '../user.service'
import { testUserData, testUsersData } from './user.service.mocks'

describe('UserService', () => {
  beforeAll(async () => {
    await preparePostgres()
  })

  afterEach(async () => {
    await userService.deleteUsers()
  })

  describe('createUser', () => {
    it('should create user', async () => {
      const user = await userService.createUser(testUserData)
      expect(user.getDataValue('login')).toBe(testUserData.login)
    })
  })

  describe('createUsers', () => {
    it('should create users', async () => {
      const createdUsers = await userService.createUsers(testUsersData)
      expect(createdUsers.length).toBe(testUsersData.length)
    })
  })

  describe('getUsers', () => {
    it('should get all users if no arguments were provided', async () => {
      await userService.createUser(testUserData)
      const users = await userService.getUsers()
      expect(users.length).toBe(1)
    })

    it('should get only required users if ids array were provided', async () => {
      const createdUsers = await userService.createUsers(testUsersData)
      const requiredUsersIds = createdUsers.slice(3).map((el: IUser) => el.id)
      const users = await userService.getUsers(requiredUsersIds)
      expect(users.length).toBe(2)
    })
  })

  describe('deleteUsers', () => {
    it('should delete all users if array with ids were not provided', async () => {
      await userService.createUsers(testUsersData)
      await userService.deleteUsers()
      const users = await userService.getUsers()
      expect(users.length).toBe(0)
    })
  })

  describe('findUserById', () => {
    it('should find user by id', async () => {
      const createdUsers = await userService.createUsers(testUsersData)
      const userToFind = createdUsers[3]
      const { dataValues: foundUser } = await userService.findUserById(
        userToFind.id,
      )
      expect(foundUser.login).toBe(userToFind.login)
      expect(foundUser.id).toBe(userToFind.id)
    })
  })

  describe('getSuggestedUsers', () => {
    it('should return suggestions', async () => {
      const createdUsers = await userService.createUsers(testUsersData)
      const loginForSuggestions = createdUsers[0].login.slice(0, 4)
      const suggestion = await userService.getSuggestedUsers(
        loginForSuggestions,
        3,
      )
      expect(suggestion.length).toBe(3)
    })
  })

  describe('updateUser', () => {
    it('should update user', async () => {
      const createdUsers = await userService.createUsers(testUsersData)
      const oldUserData = createdUsers[3]
      const newUserData = { ...oldUserData, login: 'newLogin' }
      const updatedUser = await userService.updateUser(newUserData)
      expect(updatedUser.getDataValue('login')).toBe(newUserData.login)
    })
  })

  describe('deleteUser', () => {
    it('should delete user', async () => {
      const createdUsers = await userService.createUsers(testUsersData)
      const userToDeleteId = createdUsers[3].id
      const userToDeleteLogin = createdUsers[3].login
      const deletedUser = await userService.deleteUser(userToDeleteId)
      const users = await userService.getUsers()
      expect(deletedUser.login).toBe(userToDeleteLogin)
      expect(users.length).toBe(testUsersData.length - 1)
    })
  })
})
