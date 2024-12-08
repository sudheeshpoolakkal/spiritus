import React, { useState } from 'react';
import axios from 'axios'; // Add axios to handle API requests

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        // Registration request
        const res = await axios.post('http://localhost:5000/register', { name, email, password });
        setMessage(res.data.message);
      } else {
        // Login request
        const res = await axios.post('http://localhost:5000/login', { email, password });
        setMessage('Login successful!');
        // Store token in localStorage or context for further use
        localStorage.setItem('token', res.data.token);
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg '>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'Sign up' : 'log In'} to book an appointment</p>
        {message && <p className='text-red-500'>{message}</p>}
        
        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input 
              className='border border-zinc-300 rounded w-full p-2 mt-1' 
              type='text' 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              required 
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type='email' 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            required 
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type='password' 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            required 
          />
        </div>

        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>
              Login Here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
