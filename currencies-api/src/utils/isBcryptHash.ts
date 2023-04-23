export const isBcryptHash = (password: string) => {
  const bcryptStartPartRegex = /^\$2b\$[0-9]{2}\$/
  return bcryptStartPartRegex.test(password)
}
