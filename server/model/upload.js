const mongoose= require('mongoose')


const upload_schema= new mongoose.Schema(
    {
        title:String,
    },
{timestamps:true}
)

export default Upload=mongoose.model("Upload", upload_schema)
