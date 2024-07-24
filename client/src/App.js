import './App.css';
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Menu from './pages/Menu'
import Booking from './pages/Booking'

import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/menu' element={<Menu/>}></Route>
          <Route path='/booking' element={<Booking/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
