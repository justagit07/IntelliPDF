import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

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
      pdfupload:[{ type: mongoose.Schema.Types.ObjectId, ref: 'vectordb' }],
      sessionId:
      {
        type:String,
        default:''
      },
      paid_sub:
      {
        type:Boolean,
        default:false
      },
      customerId:String,
      subscriptionId:String,
      planStartedIn:String,
      planExpireIn:String

    },
{timestamps:true}
)
 
user_schema.methods.isPasswordCorrect= async function(password)
{
     return await bcrypt.compare(password,this.password)
}


user_schema.methods.createAccessToken= function()
{  
    return jwt.sign({
        _id:this._id,
        email:this.email
    }, `${process.env.JWTSECRET}`, {expiresIn:`${process.env.JWTEXPIRY}`})
}
const User = mongoose.model("User", user_schema)
export default User