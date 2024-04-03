const mongoose= require('mongoose')


const upload_schema= new mongoose.Schema(
    {
        title:String,
    },
{timestamps:true}
)

const Upload=mongoose.model("Upload", upload_schema)
module.exports = Upload