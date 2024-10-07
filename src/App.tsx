import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home';
import Login from './pages/login/login';
import Cart from './pages/cart/cart';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
