import React, { useState } from 'react'; // Added useState import
import { assets } from '../assets/assets_admin/assets';

function Login() {
  const [state, setState] = useState('Admin');

  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-[#dadada] rounded w-full mt-1 p-2' type="email" required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-[#dadada] rounded w-full mt-1 p-2' type="password" required/>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
      </div>
    </form>
  );
}

export default Login;
