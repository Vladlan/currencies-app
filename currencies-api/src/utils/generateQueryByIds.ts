import { Op } from 'sequelize'

export const generateQueryByIds = (ids?: string[], idKey = 'id') => {
  if (!ids?.length) {
    return {}
  }
  return {
    where: {
      [idKey]: {
        [Op.in]: ids,
      },
    },
  }
}
