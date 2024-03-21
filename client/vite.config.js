import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})




// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import dotenv from "dotenv"


// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
//     'process.env.REACT_APP_API_URL_PROD': JSON.stringify(process.env.REACT_APP_API_URL_PROD)

//   }
// });
