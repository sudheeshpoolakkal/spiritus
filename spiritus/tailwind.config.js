/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme:{
      extend:{
        colors:{
          'primary':"#5f6FFF",
          hospitalBlue: '#1E3A8A', 
          hospitalGreen: '#2E8B57',
        },
        gridTemplateColumns:{
          'auto':'repeat(auto-fill, minmax(200px, 1fr))'
        }
      },
      plugins:[],
  }
  
 
}