/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPE } from '~/utils/constants'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE).required()
  })
  try {
    //abortEarly: true -> check ra lỗi là dừng ngay tại lỗi đó
    //abortEarly: false -> trả về hết lỗi(nếu có)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()

  } catch (err) {
    //status: 422 - error validation entity
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(err).message))
  }
}

export const boardValidation = {
  createNew
}