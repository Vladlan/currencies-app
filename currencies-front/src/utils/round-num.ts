export const roundNum = (num: number, limit = 10_000) =>
  Math.round((num + Number.EPSILON) * limit) / limit
