/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'

/* eslint-disable no-useless-catch*/
const createNew = async (requestbody) => {

  try {
    //Xử lý dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...requestbody,
      slug: slugify(requestbody.title)
    }
    //Gọi đến tầng Model để thêm bản ghi mới vào database
    const createdBoard = await boardModel.createNew(newBoard)
    return await boardModel.findOneById(createdBoard.insertedId)
    //Trả kết quả về, trong service luôn phải có return
  } catch (error) {
    throw error
  }
}
const getDetails = async (id) => {
  try {
    const boardDetails = await boardModel.getDetails(id)
    if (!boardDetails) throw new ApiError(StatusCodes.NOT_FOUND, 'Board is not found')
    //lồng cards vào colum
    const resBoard = cloneDeep(boardDetails)
    resBoard.columns.forEach(column => {
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })
    //xóa cards khỏi board ban đầu
    delete resBoard.cards
    return resBoard
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
    const board = await boardModel.update(id, updateData)
    return board
  } catch (error) {
    throw error
  }
}
const moveCardToDifferentColumn = async (data) => {
  try {
    // B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó (Hiểu bản chất là xóa cái _id của Card ra khỏi mảng)
    await boardModel.update(data.prevColumnId, {
      cardOrderIds: data.prevCardOrderIds,
      updatedAt: Date.now()
    })
    // B2: Cập nhật mảng cardOrderIds của Column tiếp theo (Hiểu bản chất là thêm _id của Card vào mảng)
    await boardModel.update(data.nextColumnId, {
      cardOrderIds: data.nextCardOrderIds,
      updatedAt: Date.now()
    })
    // B3: Cập nhật lại trường columnId mới của cái Card đã kéo
    await cardModel.update(data.currentCardId, {
      columnId: data.nextColumnId,
      updatedAt: Date.now()
    })
    return { updateRes: 'success' }
  } catch (error) {
    throw error
  }
}
export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}