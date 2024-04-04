
import {register, login } from '../controller/authentication.js'


import express from 'express'

const router= express.Router()

console.log('this is the auth.js inside the routes');
router.post('/', register)
router.post('/login', login)
export default router;

