import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <>
      <Navbar />

      {/* Page renders here */}
      <Outlet />

      <Footer />
    </>
  )
}

export default Layout