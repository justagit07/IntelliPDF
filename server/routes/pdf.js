
import express from 'express'
import deletepdf from '../controller/handlepdf.js'
const route = express.Router()

route.post('/', deletepdf)

export  default route