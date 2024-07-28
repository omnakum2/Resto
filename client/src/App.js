import Home from "./user/pages/Home";
import About from "./user/pages/About";
import Contact from "./user/pages/Contact";
import Menu from "./user/pages/Menu";
import Dashboard from "./admin/pages/Dashboard";
import Category from "./admin/pages/Category";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="admin" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
