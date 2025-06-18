/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { slugify } from '~/utils/formatters'

/* eslint-disable no-useless-catch*/
const createNew = async (requestbody) => {

  try {
    //Xử lý dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...requestbody,
      slug: slugify(requestbody.title)
    }
    //Trả kết quả về, trong service luôn phải có return
    return newBoard
  } catch (error) {
    throw error
  }
}
export const boardService = {
  createNew
}