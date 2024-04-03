const mongoose= require('mongoose')
const bcrypt= require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const user_schema= new mongoose.Schema(
    {
      firstname:{
        type:String,
      },
      lastname:String,
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:
      {
       type:String,
       required:true
      },
    
      subscription:
      {
        type:String,
        default:'free'
      },
      accessToken:String
    },
{timestamps:true}
)
 
user_schema.methods.isPasswordCorrect= async function(password)
{
     return await bcrypt.compare(password,this.password)
}


user_schema.methods.createAccessToken= ()=>
{
    return jwt.sign({
        _id:this._id,
        email:this.email
    }, `${process.env.JWTSECRET}`, {expiresIn:`${process.env.JWTEXPIRY}`})
}

const User=mongoose.model("User", user_schema)
module.exports = User