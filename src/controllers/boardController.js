/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createNew = async (req, res, next) => {

  try {
    // console.log(req.body)
    // res.status(StatusCodes.OK).json({ message: 'API create a new board' })
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'oh shit error!')
  } catch (err) {
    next(err)
  }
}

export const boardController = {
  createNew
}