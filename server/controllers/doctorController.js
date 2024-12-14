import doctorModel from "../models/doctorModel.js";


const changeAvailablity = async(req,res)=>{

    try{

        const {docId}= req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true, message:'Availability Changed'})
         
    }catch(error){
        console.log(error); // Log the error for better debugging
        res.json({ success: false, message:error.message});
    }

}

export {changeAvailablity}