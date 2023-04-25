export const httpErrorHandler = (error: any) => {
  const errDescription =
    error.response?.data || error.message || error.toString()
  console.error(errDescription)
}
