import User from '../model/user.js'
import Vectordb from '../model/vector.js'
export default     async  function deletepdf(req,res)
{
      try {
         console.log('hn bhai deltepdf chl rhi h abhi batoa sh');
         
      const{pdfId, userId}= req.body
      console.log('this is the pdfId', pdfId);
      
      console.log('this is the userId', userId);
      
      const vector=  await  Vectordb.deleteOne({_id: pdfId})     
              console.log('vector db', vector);
                
              const updateResult = await User.updateOne(
                { _id: userId }, 
                { $pull: { pdfupload: pdfId} } 
            );

    const user= await  User.findById(userId)
    const allupload= user.pdfupload
    console.log(`this is the all uploaded pdf id of the  ${user.firstname} `, allupload)
       
    const detail= await  Promise.all( allupload.map(async(e)=>  await Vectordb.findById({_id:e})))

    
    
    const final = detail.map(({title, _id , createdAt})=> {return {title, _id , createdAt }})
        

       

      res.status(200).json({message:'all is okay bro', final, allupload})
      } catch (error) {
        

        console.log('this is the error', error);
        res.status(500).json({message:error})
        
      }

}