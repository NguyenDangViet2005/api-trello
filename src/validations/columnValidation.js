/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict()
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (err) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(err).message))
  }
}
const update = async (req, res, next) => {
  //Lưu ý: không dùng hàm required trong khi Update
  const correctCondition = Joi.object({
    // boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().min(3).max(50).trim().strict(),
    cardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
  })
  try {
    //abortEarly: true -> check ra lỗi là dừng ngay tại lỗi đó
    //abortEarly: false -> trả về hết lỗi(nếu có)
    //đối với TH update, cho phép unknown để không cần đẩy một số field lên
    await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()

  } catch (err) {
    //status: 422 - error validation entity
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(err).message))
  }
}


export const columnValidation = {
  createNew,
  update
}