import React from "react"
import AdminSidebar from "@/component/core/adminSidebar"
import "@/styles/global.scss"
const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <AdminSidebar/>
      <main className="main-content">{children}</main>
    </div>
  )
}

export default Layout