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
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (err) {
    next(err)
  }
}

const getDetails = async (req, res, next) => {
  const boardDetails = await boardService.getDetails(req.params.id)
  res.status(StatusCodes.OK).json(boardDetails)
}
const update = async (req, res, next) => {
  try {
    const updatedBoard = await boardService.update(req.params.id, req.body)
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {
    throw error
  }
}
export const boardController = {
  createNew,
  getDetails,
  update
}