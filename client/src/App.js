import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import AdminOrders from "./components/admin/Orders";

// staff components
import StaffDashboard from "./components/staff/dashboard";
import NewOrder from "./components/staff/NewOrder";
import Orders from "./components/staff/Orders";
import ViewOrder from "./components/staff/ViewOrder";
import EditOrder from "./components/staff/EditOrder";
import CheckoutOrder from "./components/staff/CheckoutOrder";

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
      <Router>
        <Routes>
          {/* user routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute element={<AdminLayout />} requiredRole="admin" />
            }
          >
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
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          {/* staff routes */}
          <Route
            path="/staff"
            element={
              <ProtectedRoute
                element={<StaffLayout />}
                requiredRole={["admin", "staff"]}
              />
            }
          >
            <Route index element={<StaffDashboard />} />
            <Route path="new-order" element={<NewOrder />} />
            <Route path="orders" element={<Orders />} />
            <Route path="view-order/:id" element={<ViewOrder />} />
            <Route path="edit-order/:id" element={<EditOrder />} />
            <Route path="checkout-order/:id" element={<CheckoutOrder />} />
          </Route>

          {/* auth routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* error handle routes */}
          <Route path="/unAuthorized" element={<UnAuthorized />} />
          <Route path="/unAuthenticated" element={<UnAuthenticated />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
