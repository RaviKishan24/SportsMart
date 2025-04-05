import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { getUserAction } from './redux/actions/user'
import { getAdminAction } from "./redux/actions/admin"
import './App.css'
import PrivateRoute from './Components/PrivateRoute'



import Home from './Components/Home'
import Register from './Components/Register'
import OtpVerification from './Components/OtpVerification'
import Ball from './Components/Products/Ball'
import Bat from './Components/Products/Bat'
import Cart from './Components/Cart'
import Login from './Components/Login'

import Account from './Components/User/Account'
import Upload from './Components/Upload'



import Setting from './Components/Admin/Setting'
import Customers from './Components/Admin/Customers'
import Products from './Components/Admin/Products'
import AdminNavbar from './Components/Admin/AdminNavbar'
import AdminHome from './Components/Admin/AdminHome'
import PlaceOrder from './Components/User/PlaceOrder'
import Football from './Components/Products/Football'
import Passwordchange from "./Components/User/Passwordchange"

const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: "/Bat", element: <Bat />, },
    { path: "/Login", element: <Login /> },
    { path: "/Register", element: <Register /> },
    { path: "/otp-verification", element: <OtpVerification /> },
    { path: "/cart", element: <Cart /> },
    { path: "/Ball", element: <Ball /> },
    { path: '/Account', element: <Account /> },
    { path: "/Football", element: <Football/> },
    { path: '/upload', element: <Upload /> },
    { path: '/changepassword', element:<Passwordchange/> },
    {path:'/placeOrder',element:<PlaceOrder/>},
    // 🔥 Private Route for Admin Only
    {
      path: "/admin",
      element: <PrivateRoute role={['admin']} />,   // Protects all /admin routes
      children: [
        { path: "", element: <AdminNavbar />},
        { path: "home", element: <AdminHome /> },
        { path: "setting", element: <Setting /> },
        { path: "customers", element: <Customers /> },
        { path: "products", element: <Products /> }


      ]
    }

  ])
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userRes = await fetch("http://localhost:7000/api/check-auth", {
          method: "GET",
          credentials: "include",
        });
        const userData = await userRes.json();

        if (userData.isAuthenticated) {
          dispatch(getUserAction());
          localStorage.setItem("role", "user");
          return;
        }

        const adminRes = await fetch("http://localhost:7000/adminApi/check-auth", {
          method: "GET",
          credentials: "include",
        });
        const adminData = await adminRes.json();

        if (adminData.isAuthenticated) {
          dispatch(getAdminAction());
          localStorage.setItem("role", "admin");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    checkAuthentication();
  }, [dispatch]);



  return (
    <>
      <Toaster position='top-right' richColors />
      <RouterProvider router={router} />
    </>
  )
}

export default App
