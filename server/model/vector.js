import mongoose from "mongoose"

const Vector_schema= new mongoose.Schema(
    {
        title:String,
        description:String,
        vector:[Number],

    },
{timestamps:true}
)

const Vectordb=mongoose.model("Vectordb", Vector_schema)
export default Vectordb