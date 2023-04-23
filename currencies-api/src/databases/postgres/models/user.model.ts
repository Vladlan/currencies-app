import {
  BeforeSave,
  Column,
  DataType,
  Model,
  Scopes,
  Table,
  Unique,
} from 'sequelize-typescript'
import { IUser, IUserCreate } from '../../../types'
import { encryptPassword, isBcryptHash } from '../../../utils'
import { SCOPE_FULL } from '../../../constants'

@Scopes(() => ({
  [SCOPE_FULL]: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    raw: false,
  },
}))
@Table
export class User extends Model<IUser, IUserCreate> {
  @BeforeSave
  static encryptPassword(userInstance: User) {
    const password = userInstance.getDataValue('password')
    if (isBcryptHash(password)) return
    userInstance.password = encryptPassword(password)
  }

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id!: string

  @Unique
  @Column(DataType.STRING)
  login!: string

  @Column(DataType.STRING)
  password!: string
}
