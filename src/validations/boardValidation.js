/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    //abortEarly: true -> check ra lỗi là dừng ngay tại lỗi đó
    //abortEarly: false -> trả về hết lỗi(nếu có)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.OK).json({ message: 'API create a new board' })
  } catch (err) {
    //status: 422 - error validation entity
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: new Error(err).message })
  }
}

export const boardValidation = {
  createNew
}