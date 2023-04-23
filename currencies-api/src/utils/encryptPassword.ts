import { hashSync } from 'bcrypt'

export const encryptPassword = (password: string): string => {
  const salt = process.env.PASSWORD_HASH_SALT as string
  return hashSync(password, salt)
}
