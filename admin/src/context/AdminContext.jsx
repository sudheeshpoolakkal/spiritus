import { createContext, useState } from 'react';
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
  
  const [aToken, setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'): '');
  const [doctors,setDoctors]= useState([]);
  const [appointments,setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  

  const getAllDoctors = async() =>{
    try
    {
  
      const {data}= await axios.post (backendUrl + '/api/admin/all-doctors' , {}, {headers:{aToken}})

       if(data.success)
       {
        setDoctors(data.doctors)
        console.log(data.doctors)

      }else{
          toast.error(data.message)
      }
    }catch (error)
    {
       toast.error(error.message) 
    }
  }

  const changeAvailability = async(docId)=>{
       
    try{
          
      const { data }= await axios.post(backendUrl + '/api/admin/change-availability' , {docId} ,{headers:{aToken}})
        if(data.success){
          toast.success(data.message)
          getAllDoctors()
        }else{
          toast.error(data.message)
        }


    }catch(error){
      toast.error(error.message)
    }


  }

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { aToken },
      });
  
      if (data.success) {
        const appointmentsWithPrescriptions = await Promise.all(
          data.appointments.map(async (appointment) => {
            if (appointment.isCompleted) {
              try {
                // Request only if prescription exists
                const prescriptionRes = await axios.get(
                  `${backendUrl}/api/prescription/admin/${appointment._id}`,
                  { headers: { aToken } }
                );
                
        
                if (prescriptionRes.data.success) {
                  return { ...appointment, prescription: prescriptionRes.data.prescription };
                }
              } catch (error) {
                // Log error but don't break execution
                console.warn(`No prescription found for appointment ${appointment._id}`);
              }
            }
            return { ...appointment, prescription: null };
          })
        );
        
        setAppointments(appointmentsWithPrescriptions);
        
        
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  

    const cancelAppointment = async (appointmentId) => {
      try {
        const { data } = await axios.post(
          backendUrl + '/api/admin/cancel-appointment',
          { appointmentId },
          { headers: { aToken } }
        );
    
        if (data.success) {
          toast.success(data.message);
          getAllAppointments();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    const getDashData = async () =>{
      
      try {
        
        const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})

        if (data.success) {
          setDashData(data.dashData)
          console.log(data.dashData);
        }
        else{
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message);
      }

    }

 
    const getPrescriptions = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/prescription/admin`, {
          headers: { aToken },
        });
    
        if (data.success) {
          setPrescriptions(data.prescriptions);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };
    
        


  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
    getPrescriptions,
  };

  return <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>;
};

export default AdminContextProvider;
