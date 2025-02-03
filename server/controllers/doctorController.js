import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

const doctorList= async(req,res)=>{
    try {
        
          const doctors= await doctorModel.find({}).select(['-password','-email'])
          res.json({success:true,doctors})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message:error.message})
    }
}

//api for doctor
const  loginDoctor = async (req, res) => {
    try {

        const {email,password}=  req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:'Invalid Email or Password'})
        }
        
        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch){

            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            return res.json({success:false,message:'Invalid Email or Password'})
        }
        
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message:error.message})
    }
}

// api to get doctor appoinment for doctor panel

const appointmentsDoctor= async(req,res)=>{

     try {

        const {docId} = req.body
        const appointments = await appointmentModel.find({ docId })
        res.json({success: true , appointments})
        
     } catch (error) {
        console.log(error)
        res.json({ success: false, message:error.message})
     }

}


//API to mark appointment as completed

const appointmentComplete= async(req,res)=>{

    try {
        
        const {docId, appointmentId} = req.body
        const appointmentData= await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId)
        {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success:true,message:'Appointment completed'})
        }
        else{

            return res.json({success:false,message:'Invalid Appointment Id or Doctor Id'})
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message:error.message})
    }
}

//API to cancel appointment for docpanel

const appointmentCancel= async(req,res)=>{

    try {
        
        const {docId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId)
        {
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled: true })
            return res.json({success:true,message:'Appointment cancelled'})
        }
        else{

            return res.json({success:false,message:'cancellation failed'})
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message:error.message})
    }
}

// API to get dashboard data for doctor panel
const doctorDashboard = async (req,res) =>{

    try {
        
        const {docId} = req.body

        const appointments = await appointmentModel.find({docId})

        let earnings = 0

        appointments.map((item)=>{
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item)=>{
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})



    } catch (error) {
        console.log(error)
        res.json({ success: false, message:error.message})
    }

}


export { changeAvailablity, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard}