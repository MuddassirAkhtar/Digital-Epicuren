
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/routes.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-white">
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
