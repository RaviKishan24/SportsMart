import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { getUserAction } from './redux/actions/user'
import { getAdminAction } from "./redux/actions/admin"
import './App.css'
import PrivateRoute from './Components/PrivateRoute'
import Layout from "./Components/Layout"



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
import Story from './Components/footer/Story'
import Terms from './Components/footer/Terms'
import Privacy from './Components/footer/Privacy'
import Return from './Components/footer/Return'
import Shipping from './Components/footer/Shipping'
import Pumas from './Components/footer/Pumas'
import Addidas from './Components/footer/Addidas'
import Nike from './Components/footer/Nike'
import Cricket from './Components/footer/Criket'
import Archery from './Components/footer/Archery'
import Tennis from './Components/footer/Tennis'
import Foot from './Components/footer/Foot'
import Carrom from './Components/Products/Carrom'
import Badminton from './Components/Products/Badminton'
import Basket from './Components/Products/Basket'
import Volly from './Components/Products/Volly'
import Chess from './Components/Products/Chess'
import Table from './Components/Products/Table'
import Shuttles from './Components/Products/Shuttles'
import Footwears from './Components/Products/Footwears'
import Apparels from './Components/Products/Apparels'
import AllCategories from './Components/AllCategories'

const router = createBrowserRouter(
  [{
    path: "/", element: <Layout />, children: [
      { path: '/', element: <Home /> },
      { path: "/Bat", element: <Bat />, },
      { path: "/Login", element: <Login /> },

      { path: "/Register", element: <Register /> },
      { path: "/otp-verification", element: <OtpVerification /> },
      { path: "/cart", element: <Cart /> },
      { path: "/placeOrder", element: <PlaceOrder></PlaceOrder> },
      { path: "/Ball", element: <Ball /> },
      { path: "/badminton", element: <Badminton></Badminton> },
      { path: "/basket", element: <Basket></Basket> },
      { path: "/volly", element: <Volly></Volly> },
      { path: "/chess", element: <Chess></Chess> },
      { path: "/table", element: <Table></Table> },
      { path: "/shuttle", element: <Shuttles></Shuttles> },
      { path: "/trophy", element: <Footwears></Footwears> },
      { path: "/apparels", element: <Apparels></Apparels> },
      { path: "/carromboard", element: <Carrom></Carrom> },

      { path: '/Account', element: <Account /> },
      { path: "/Football", element: <Football /> },
      { path: '/upload', element: <Upload /> },
      { path: '/changepassword', element: <Passwordchange /> },
      { path: '/our-story', element: <Story></Story> },
      { path: '/term', element: <Terms></Terms> },
      { path: '/privacy', element: <Privacy></Privacy> },
      { path: '/return', element: <Return></Return> },
      { path: '/shipping', element: <Shipping></Shipping> },
      { path: '/pumas', element: <Pumas></Pumas> },
      { path: '/addidas', element: <Addidas></Addidas> },
      { path: '/nike', element: <Nike></Nike> },
      { path: '/criket', element: <Cricket></Cricket> },
      { path: '/foot', element: <Foot></Foot> },
      { path: '/archery', element: <Archery></Archery> },
      { path: '/tennis', element: <Tennis></Tennis> },
      { path: '/all-categories',element:<AllCategories/> }

    ]
  },
  {
    path: "/admin", element: <PrivateRoute role={['admin']} />,   // Protects all /admin routes
    children: [
      { path: "", element: <AdminNavbar /> },
      { path: "home", element: <AdminHome /> },
      { path: "setting", element: <Setting /> },
      { path: "customers", element: <Customers /> },
      { path: "products", element: <Products /> },



    ]
  }

  ])
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userRes = await fetch("https://sportsmart-ag6m.onrender.com/api/check-auth", {
          method: "GET",
          credentials: "include",
        });
        const userData = await userRes.json();

        if (userData.isAuthenticated) {
          dispatch(getUserAction());
          localStorage.setItem("role", "user");
          return;
        }

        const adminRes = await fetch("https://sportsmart-ag6m.onrender.com/adminApi/check-auth", {
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
