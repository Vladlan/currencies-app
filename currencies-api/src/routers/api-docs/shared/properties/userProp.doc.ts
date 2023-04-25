import { idStringProp } from './idStringProp.doc'
import { loginProp } from './loginProp.doc'

export const userProp = {
  user: {
    ...idStringProp,
    ...loginProp,
  },
}
