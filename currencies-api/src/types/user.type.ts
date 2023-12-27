import { Optional } from 'sequelize'

export interface IUser {
  readonly id: string
  login: string
  password: string
}

export interface IUserUpdate {
  readonly id: string
  login?: string
  password?: string
}

export type IUserCreate = Optional<IUser, 'id'>
