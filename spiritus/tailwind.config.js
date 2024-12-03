// tailwind.config.js
module.exports = {
  darkMode: ['class', 'class'], // Enables class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme:{
      extend:{
        colors:{
          'primary':"#5f6FFF"
        },
        gridTemplateColumns:{
          'auto':'repeat(auto-fill, minmax(200px, 1fr))'
        }
      },
      plugins:[],
  }
  
 
}