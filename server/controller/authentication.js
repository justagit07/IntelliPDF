const bcrypt = require('bcrypt')
const User= require('../model/user')
const mongoose= require('mongoose')
const jwt = require('jsonwebtoken')
const createJwtToken= require('../utils/jwt')


const register= async(req,res)=>
{
    try {
        const {firstname, lastname, email, pass}= req.body
        const password =  await bcrypt.hash(pass, 10)
      const response=  await User.create({firstname,lastname,email,password})
      console.log('user succesfully', response)

      res.status(200).json(response)
    } 
    catch (error) 
    {
          console.log('unable to register in database', error)
          res.status(500).json(error)

        
    }

    
}



const login= async (req,res)=>
{
     console.log('hnji ')
      const {email, password}= req.body
      console.log(req.body)
      const user= await  User.findById({email})
      console.log('this is the user', user);
      

}

module.exports = {register, login}