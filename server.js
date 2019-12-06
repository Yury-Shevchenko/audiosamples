'use strict'

const { MongoClient } = require('mongodb')
const api = require('./lib/api')
const body = require('body-parser')
const co = require('co')
const express = require('express')
const next = require('next')
const cors = require('cors')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const MONGO_URL = 'mongodb://admin:stutter1@ds237337.mlab.com:37337/stutter'
const PORT = 3010

co(function * () {
  yield app.prepare()

  console.log(`Connecting to ${MONGO_URL}`)
  const client = yield MongoClient.connect(MONGO_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
  })
  const db = client.db('stutter')

  const server = express()

  server.use(body.json())
  server.use((req, res, next) => {
    req.db = db
    next()
  })
  server.use('/api', api(db))
  server.use(cors())

  server.get('*', (req, res) => handle(req, res))

  server.listen(PORT)
  console.log(`Listening on ${PORT}`)
}).catch(error => console.error(error.stack))
