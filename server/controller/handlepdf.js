import User from '../model/user.js'
import Vectordb from '../model/vector.js'
export default     async  function deletepdf(req,res)
{

    const{pdfId, userId}= req.body
    const vector=  await  Vectordb.deleteOne({_id: pdfId})     
     const updateResult = await User.updateOne(
        { _id: userId }, 
        { $pull: { pdfupload: pdfId} } 
    );

    res.status(200).json({message:'all is okay bro'})

}