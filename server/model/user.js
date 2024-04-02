const mongoose= require('mongoose')


const user_schema= new mongoose.Schema(
    {
      firstname:{
        type:String,
        required:true,
      },
      lastname:String,
      email:{
        type:String,
        required:true,
        unique:true
      },
    
      Subscription:
      {
        type:String,
        default:'free'
      }
    },
{timestamps:true}
)

const User=mongoose.model("User", user_schema)
module.exports = User