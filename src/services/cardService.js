/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { cardModel } from '~/models/cardModel'

const createNew = async (requestbody) => {

  try {
    const newCard = {
      ...requestbody
    }
    const createdCard = await cardModel.createNew(newCard)
    return await cardModel.findOneById(createdCard.insertedId)
  } catch (error) {
    throw error
  }
}
export const cardService = {
  createNew
}