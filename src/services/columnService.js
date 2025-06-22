/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (requestbody) => {

  try {
    const newColumn = {
      ...requestbody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    if (getNewColumn) {
      getNewColumn.cards = []
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    return getNewColumn
  } catch (error) {
    throw error
  }
}
const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updateAt: Date.now()
    }
    const updatedColumn = await columnModel.update(id, updateData)
    return updatedColumn
  } catch (error) {
    throw error
  }
}
const deleteColumn = async (id) => {
  try {
    const targetColumn = await columnModel.findOneById(id)
    //Xóa column
    await columnModel.deleteOneById(id)
    //Xóa toàn bộ card thuộc column
    await cardModel.deleteManyByColumnId(id)
    //Xóa columnId trong ColumnOrderIds trong Board
    await boardModel.pullColumnOrderIds(targetColumn)
    return { deleteRes: 'Column and its cards have been deleted' }
  } catch (error) {
    throw error
  }
}
export const columnService = {
  createNew,
  update,
  deleteColumn
}