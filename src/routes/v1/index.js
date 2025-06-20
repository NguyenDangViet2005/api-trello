/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
const Router = express.Router()
import { boardRoute } from './boardRoute'
import { columnRoute } from './columnRoute'
import { cardRouter } from './cardRoute'

Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'APIs are ready to use!' })
})
// board API
Router.use('/boards', boardRoute)
// column API
Router.use('/columns', columnRoute)
// card API
Router.use('/cards', cardRouter)
export const APIs_V1 = Router
