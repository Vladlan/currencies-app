export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${year} ${month} ${day} ${hours}:${minutes}:${seconds}`
}
