import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'
import AppRoutes from './routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-500">Inicio</Link>
        <Link to="/about" className="text-green-500">Acerca de</Link>
      </nav>

      <AppRoutes />
    </>
  )
}

export default App
