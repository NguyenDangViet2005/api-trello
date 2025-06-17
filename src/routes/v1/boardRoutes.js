/**
 * Updated by trungquandev.com's author on August 17 2023
 * dangvietdev - mot lap trinh vien
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'API get list boards' }))
  .post((req, res) => res.status(StatusCodes.CREATED).json({ message: 'API create a new Board' }))
export const boardRouters = Router
