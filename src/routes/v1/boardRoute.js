/**
 * Updated by trungquandev.com's author on August 17 2023
 * dangvietdev - mot lap trinh vien
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'API get list boards' }))
  //ban đầu sẽ chạy vào validation và khi gặp lệnh Next() thì nhảy qua controller
  .post(boardValidation.createNew, boardController.createNew)
export const boardRoute = Router
