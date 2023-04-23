import jwt, { Algorithm } from 'jsonwebtoken'
import { AUTH_MSGS } from '../constants/messages'
import { IAuthLoginBody } from '../types'
import { encryptPassword } from '../utils'
import { User as UserModel } from '../databases/postgres/models'

class AuthService {
  async login({ login, password }: IAuthLoginBody) {
    const hashedPassword = encryptPassword(password)
    const user = await UserModel.findOne({
      where: { login, password: hashedPassword },
    })
    if (user) {
      const jwtSecret = process.env.JWT_SECRET as string
      const jwtAlgorithm = process.env.JWT_ALGORITHM as Algorithm
      const payload = { login }
      const week = 60 * 60 * 24 * 7
      const token = jwt.sign(payload, jwtSecret, {
        expiresIn: week,
        algorithm: jwtAlgorithm,
      })
      return token
    }
    throw new Error(AUTH_MSGS.loginOrPasswordAreWrong)
  }
}

export const authService = new AuthService()
