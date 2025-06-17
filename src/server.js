/*eslint-disable no-console*/
import express from 'express'
import { CONNECT_DB, GET_DB } from '~/config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  //fuction listCollections return a promise => must use await
  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())

    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`3. Hello dangvietdev, server is running at http://${hostname}:${port}/`)
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
