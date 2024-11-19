import './App.css';
import Signup from './pages/signup'
import Nav from './components/nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Employee from './pages/employee'
import Allocate from './pages/allocate'
import Home from './pages/home' 
import PrivateRoutes from './components/PrivateRoutes' 
import Logout from './pages/logout'
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/project allocation' element={<Allocate />} />
            <Route path='/employee' element={<Employee />} />
          </Route>
          <Route path='/SignUp' element={<Signup />} />
          <Route path='/Logout' element={<Logout/>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
