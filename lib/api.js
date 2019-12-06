'use strict'

const Archetype = require('archetype-js')
const BookType = require('./book')
const { ObjectId } = require('mongodb')
const express = require('express')
const multer = require('multer')
const fs = require('fs')

module.exports = db => {
  const router = express.Router()

  const wrapAsync = handler => (req, res) => handler(req)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message }))

  router.get('/', wrapAsync(async function(req) {
    return db.collection('Book').find().sort({ createdAt: -1 }).toArray()
  }))

  // router.post('/', wrapAsync(async function(req) {
  //   const book = new BookType(req.body)
  //   await db.collection('Book').insertOne(book)
  //   return { book }
  // }))

  router.delete('/:id', wrapAsync(async function(req) {
    const record = await db.collection('Book').findOne({
      _id: Archetype.to(req.params.id, ObjectId)
    })
    const filename = record.filename + '.mp3'
    const path = './files/' + filename
    // delete from the file system
    await fs.unlink(path, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
    const { result } = await db.collection('Book').deleteOne({
      _id: Archetype.to(req.params.id, ObjectId)
    })
    return { result }
  }))

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files')
    },
    filename: function (req, file, cb) {
      console.log('file', file);
      // cb(null, Date.now() + '-' + file.originalname )
      cb(null, file.originalname)
    }
  })
  const upload = multer({ storage: storage }).array('file')

  router.post('/upload', async (req, res) => {
    // req.file.originalname = 'ICanOverWriteIt'
    // const filename = uniqid()
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      } else if (err) {
        return res.status(500).json(err)
      }
      const {title, author, filename} = req.body
      const book = new BookType({title: title, author: author, filename: filename})
      await db.collection('Book').insertOne(book)
      return res.status(200).send(book)
    })
  });

  return router
}
