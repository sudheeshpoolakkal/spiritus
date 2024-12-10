import React from 'react'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors } = useContext(AdminContext)
  
  useEffect(()=>{
     if (aToken){
      getAllDoctors()
     }

  },[aToken])


  return (
    <div>
      

    </div>
  )
}

export default DoctorsList