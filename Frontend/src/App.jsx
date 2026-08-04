import { useState } from 'react'
import  logo  from './assets/logo.png'
import Navbar from './components/navbar'
import Home from './pages/home'
import Footer from './components/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div className='flex min-h-screen flex-col'>
      <Router>
        <Navbar />
        <main className='flex-1'>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
