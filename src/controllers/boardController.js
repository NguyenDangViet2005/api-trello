/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {

  try {
    //Điều hướng đến Service
    const createdBoard = await boardService.createNew(req.body)
    //Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(createdBoard)
  } catch (err) {
    next(err)
  }
}

export const boardController = {
  createNew
}