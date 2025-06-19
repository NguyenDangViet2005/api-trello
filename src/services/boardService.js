/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { StatusCodes } from 'http-status-codes'
import { boardModel } from '~/models/boardModel'
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
    return boardDetails
  } catch (error) {
    throw error
  }
}
export const boardService = {
  createNew,
  getDetails
}