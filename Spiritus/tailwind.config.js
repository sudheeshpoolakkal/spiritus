// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS/JSX/TS/TSX files in src
  ],
  theme: {
    extend: {
      // Your customizations here
    },
  },
  plugins: [],
};
