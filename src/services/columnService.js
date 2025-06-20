/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { columnModel } from '~/models/columnModel'

const createNew = async (requestbody) => {

  try {
    const newColumn = {
      ...requestbody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    return await columnModel.findOneById(createdColumn.insertedId)
  } catch (error) {
    throw error
  }
}
export const columnService = {
  createNew
}