/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {

  try {
    const createdColumn = await columnService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (err) {
    next(err)
  }
}
const update = async (req, res, next) => {
  try {
    const updatedColumn = await columnService.update(req.params.id, req.body)
    res.status(StatusCodes.OK).json(updatedColumn)
  } catch (error) {
    throw error
  }
}
const deleteColumn = async (req, res, next) => {
  try {
    const deleteItem = await columnService.deleteColumn(req.params.id, req.body)
    res.status(StatusCodes.OK).json(deleteItem)
  } catch (error) {
    throw error
  }
}
export const columnController = {
  createNew,
  update,
  deleteColumn
}