import axios from 'axios'
import { API_URL, LOGIN_ROUTE } from '../constants'

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/${LOGIN_ROUTE}`, {
    login: username,
    password,
  })
  if (response.data.token) {
    localStorage.setItem('user', response.data.token)
  }
  return response.data
}

export const logout = () => {
  localStorage.removeItem('user')
}

export const getCurrentUserToken = () => {
  const token = localStorage.getItem('user')
  if (token) return token

  return null
}

export const getAuthHeader = () => {
  const token = getCurrentUserToken()
  if (token) return { Authorization: token }

  return {}
}
