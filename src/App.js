import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home/Home';
import DetailPet from './DetailPet/DetailPet';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Cart from './Cart/Cart';
import Admin from './Admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/pet/:id' element={<DetailPet />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mycart' element={<Cart />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<div> <h4>404 NOT FOUND !!</h4></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
