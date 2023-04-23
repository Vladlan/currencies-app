import { Optional } from 'sequelize'

export interface IUser {
  readonly id: string
  login: string
  password: string
  age: number
}

export interface IUserUpdate {
  readonly id: string
  login?: string
  password?: string
  age?: number
}

export type IUserCreate = Optional<IUser, 'id'>
