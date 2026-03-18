import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"

function Layout() {
  return (
    <>
      <Navbar />
         <ScrollToTop/>

      {/* Page renders here */}
      <Outlet />

      <Footer />
    </>
  )
}

export default Layout