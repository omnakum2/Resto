import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import StaffLayout from "./components/StaffLayout";
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

// staff components
import StaffDashboard from "./components/staff/dashboard";

// auth components
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import UnAuthorized from "./components/UnAuthorized";
import UnAuthenticated from "./components/UnAuthenticated";

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
          <Route path="/admin" element={<ProtectedRoute element={<AdminLayout />} requiredRole="admin" />}>
            <Route index element={<ProtectedRoute element={<Dashboard />} requiredRole="admin" />} />
            <Route path="category" element={<ProtectedRoute element={<Category />} requiredRole="admin" />} />
            <Route path="category-add" element={<ProtectedRoute element={<AddCategory />} requiredRole="admin" />} />
            <Route path="category-edit/:id" element={<ProtectedRoute element={<UpdateCategory />} requiredRole="admin" />} />
            <Route path="table" element={<ProtectedRoute element={<Table />} requiredRole="admin" />} />
            <Route path="table-add" element={<ProtectedRoute element={<AddTable />} requiredRole="admin" />} />
            <Route path="table-edit/:id" element={<ProtectedRoute element={<UpdateTable />} requiredRole="admin" />} />
            <Route path="food" element={<ProtectedRoute element={<Food />} requiredRole="admin" />} />
            <Route path="food-add" element={<ProtectedRoute element={<AddFood />} requiredRole="admin" />} />
            <Route path="food-edit/:id" element={<ProtectedRoute element={<UpdateFood />} requiredRole="admin" />} />
          </Route>

          {/* staff routes */}
          <Route path="/staff" element={<ProtectedRoute element={<StaffLayout />} requiredRole={['admin','staff']} />}>
            <Route index element={<ProtectedRoute element={<StaffDashboard />} requiredRole={['admin','staff']} />} />
          </Route>

          {/* auth routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* error handle routes */}
          <Route path="/unAuthorized" element={<UnAuthorized />} />
          <Route path="/unAuthenticated" element={<UnAuthenticated />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
