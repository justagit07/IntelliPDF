import mongoose from "mongoose"

const Vector_schema= new mongoose.Schema(
    {
        title:String,
        size:Number,
        path:String,
        

    },
{timestamps:true}
)

const Vectordb=mongoose.model("Vectordb", Vector_schema)
export default Vectordb