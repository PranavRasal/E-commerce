import Navbar from './components/navbar'
import Home from './pages/home'
import About from './pages/about'
import ReturnPolicy from './pages/returnPolicy'
import Disclaimer from './pages/disclaimer'
import Footer from './components/footer'
import Register from './pages/register'
import Login from './pages/login'
import Cart from './pages/cart'
import ProductDetail from './pages/productDetail'
import ProductMod from './components/productMod.jsx'
import Admin from './pages/admin.jsx'
import Order from './pages/order.jsx'
import UpdateStatus from './pages/updateStatus.jsx'
import CreateProduct from './pages/createProduct.jsx'
import Profile from './pages/profile.jsx'
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
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/product/:id/edit' element={<ProductMod />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/create-product' element={<CreateProduct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<Order />} />
            <Route path='/update-status' element={<UpdateStatus />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </main>
        <Footer />  // added the Footer component to the bottom of the page
      </Router>
    </div>
  )
}

export default App
