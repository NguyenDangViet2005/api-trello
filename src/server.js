/*eslint-disable no-console*/
import express from 'express'
import { CLOSE_DB, CONNECT_DB, GET_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  //fuction listCollections return a promise => must use await
  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    process.exit(0)
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`3. Hello dangvietdev, server is running at http://${hostname}:${port}/`)
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
