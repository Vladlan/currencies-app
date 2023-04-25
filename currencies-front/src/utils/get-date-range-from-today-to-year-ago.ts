function getDateTwoDaysAgo() {
  const today = new Date()
  const twoDaysAgo = new Date(today)
  twoDaysAgo.setDate(today.getDate() - 2)
  return twoDaysAgo
}

export function getDateRangeFromTodayToYearAgo() {
  const twoDaysAgo = getDateTwoDaysAgo() // api limitations

  const today = new Date()
  const yearAgo = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate(),
  )

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return [formatDate(yearAgo), formatDate(twoDaysAgo)]
}
