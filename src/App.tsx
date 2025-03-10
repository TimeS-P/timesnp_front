import AppRoutes from './routes/routes'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <AppRoutes />
      </div>
      <Footer />
    </div>
    </>
  )
}

export default App
