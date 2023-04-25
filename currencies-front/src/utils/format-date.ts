export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${year} ${month} ${day} ${hours}:${minutes}:${seconds}`
}
