// filepath: c:\Users\Noor\OneDrive - The British University in Egypt\Desktop\testproject\myreactproject\tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22a6f1",
        secondary: "#050505",
      },
      container:{
        center:true,
        padding:{
          DEFAULT:"1rem",
          sm:"3rem",

        }
      },
      }
    },
  plugins: [],
};