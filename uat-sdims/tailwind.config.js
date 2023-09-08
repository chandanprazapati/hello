/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  plugins: [
    require('tw-elements/dist/plugin')
  ],
  theme: {
    extend: {
      colors:{
        blue:{
          100:"#1B76D2"
        }
      }
    },
  },
  plugins: [],
}

