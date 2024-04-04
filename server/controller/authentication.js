import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
import User from '../model/user.js'
import Vectordb from '../model/vector.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'



export const register= async(req,res)=>
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



export const login= async (req,res)=>
{
    try {

      const {email, password}= req.body

      
        const user= await  User.findOne({email})
        if(!user)
        {
          console.log("email id is invalid")
          return res.status(500).json({message:"invalid email "})

        }
        
        const passwordcheck=  await user.isPasswordCorrect(password)
        if(!passwordcheck)
        {
              console.log('password is incorrect')
          return  res.status(402).json({message:"password is incorrect"})

        }
        const accessToken= await user.createAccessToken()
        if(!accessToken)
        {
              console.log('unable to genrate the acesstoken');
              return res.status(500).json({message:"acesstoken is not genrated"})
              
        }
        const allupload= user.pdfupload
        console.log(`this is the all uploaded pdf id of the user ${user.name} `, allupload)
           
        const detail= await  Promise.all( allupload.map(async(e)=>  await Vectordb.findById({_id:e})))
        
        const final = detail.map(({title, _id , createdAt})=> {return {title, _id , createdAt }})

        console.log('accesstoken', accessToken);


        res.status(200).json({accessToken,user, final, message:"token is genreated succesfully authentication complete"})
    } catch (error) {
      console.log('this is the error', error)
      res.status(500).json(error)
    }
     
      

}

