import { BrowserRouter, Routes, Route } from "react-router-dom";

// user components
import Home from "./user/pages/Home";
import About from "./user/pages/About";
import Contact from "./user/pages/Contact";
import Menu from "./user/pages/Menu";

// admin components
import Dashboard from "./admin/pages/Dashboard";
import Category from "./admin/pages/Category";
import AddCategory from "./admin/pages/addCategory";
import UpdateCategory from "./admin/pages/updateCategory";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* user routes */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>

          {/* admin routes */}
          <Route path="admin" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="category-add" element={<AddCategory />} />
          <Route path="category-edit/:id" element={<UpdateCategory />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
