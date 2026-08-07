import Navbar from './components/navbar'
import Home from './pages/home'
import About from './pages/about'
import ReturnPolicy from './pages/returnPolicy'
import Disclaimer from './pages/disclaimer'
import Footer from './components/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Router>
        <Navbar />
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/return-policy' element={<ReturnPolicy />} />
            <Route path='/disclaimer' element={<Disclaimer />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
