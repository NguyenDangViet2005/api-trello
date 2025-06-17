/*eslint-disable no-console*/
import express from 'express'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hello ${env.AUTHOR}, server is running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })
  exitHook(() => {
    console.log('Disconnecting...')
    CLOSE_DB()
    console.log('Disconnected!')

  })
}
//Immediately-Invoked - Anonymous async function(IIFE)
(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connect successfully!')
    START_SERVER()
  } catch (err) {
    console.error(err)
    process.exit(0)
  }
})()
