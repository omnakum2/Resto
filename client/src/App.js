import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/UserLayout";

// user components
import Home from "./components/user/Home";
import About from "./components/user/About";
import Contact from "./components/user/Contact";
import Menu from "./components/user/Menu";

// admin components
import Dashboard from "./components/admin/Dashboard";
import Category from "./components/admin/Category";
import AddCategory from "./components/admin/addCategory";
import UpdateCategory from "./components/admin/updateCategory";
import Table from "./components/admin/Table";
import AddTable from "./components/admin/addTable";
import UpdateTable from "./components/admin/updateTable";
import Food from "./components/admin/Food";
import AddFood from "./components/admin/addFood";
import UpdateFood from "./components/admin/updateFood";
import AdminLayout from "./components/AdminLayout";

// auth components
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* user routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* admin routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="category-add" element={<AddCategory />} />
            <Route path="category-edit/:id" element={<UpdateCategory />} />
            <Route path="table" element={<Table />} />
            <Route path="table-add" element={<AddTable />} />
            <Route path="table-edit/:id" element={<UpdateTable />} />
            <Route path="food" element={<Food />} />
            <Route path="food-add" element={<AddFood />} />
            <Route path="food-edit/:id" element={<UpdateFood />} />
          </Route>

          {/* auth routes */}
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
