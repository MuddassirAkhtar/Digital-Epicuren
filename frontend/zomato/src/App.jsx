import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/routes.jsx'
import { AuthProvider } from './context/authContext.jsx'
import api from "./utils/axiosInstance";
import { useEffect } from "react";

function App() {

 
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App min-h-screen bg-white">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;