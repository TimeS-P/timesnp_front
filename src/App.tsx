  import { useRef, useState } from 'react'
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'
  import { Link } from 'react-router-dom'
  import AppRoutes from './routes'
  import ModalRegistroContent from './components/auth/ModalRegistroContent'
  import { Button } from '@heroui/react'
  import ModalRegistro, { ModalHandle } from './components/auth/ModalRegistro'

  function App() {
    const [count, setCount] = useState(0);

    const modalRef = useRef<ModalHandle>(null);

    const handleClicked = () => {
      modalRef.current?.openModal(); // Llama a la función del modal
    };

    return (
      <>
        <ModalRegistro ref={modalRef} />
        <Button onClickCapture={handleClicked}>Abrir modal</Button>
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-500">Inicio</Link>
          <Link to="/about" className="text-green-500">Acerca de</Link>
          
        </nav>

        <ModalRegistroContent />

        <AppRoutes />
      </>
    )
  }

  export default App
