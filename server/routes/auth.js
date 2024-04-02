const {register, login} = require('../controller/authentication')


const express= require('express')

const router= express.Router()

console.log('this is the auth.js inside the routes');
router.post('/', register)
router.get('/login', login)

module.exports = router;