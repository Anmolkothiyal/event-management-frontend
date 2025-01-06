import PageRoutes from "@/utilis/PageRoute"
import Link from "next/link"
import { FaUsers, FaCalendar, FaTicketAlt, FaComment, FaChartBar, FaCog, FaMoon } from "react-icons/fa"

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-content">
        <h1 className="sidebar-title">Admin Panel</h1>
        <p className="menu-label">Menu</p>
        <nav className="nav-menu">
          <Link href={PageRoutes.ADMINDASBOARD()} className="nav-link">
            <FaChartBar className="nav-icon" />
            <span>Dashboard</span>
          </Link>
          <Link href="/users" className="nav-link">
            <FaUsers className="nav-icon" />
            <span>Users</span>
          </Link>
          <Link href="/events" className="nav-link">
            <FaCalendar className="nav-icon" />
            <span>Events</span>
          </Link>
          <Link href="/tickets" className="nav-link">
            <FaTicketAlt className="nav-icon" />
            <span>Tickets</span>
          </Link>
          <Link href="/feedback" className="nav-link">
            <FaComment className="nav-icon" />
            <span>Feedback</span>
          </Link>
        </nav>
      </div>
      
      <div className="sidebar-footer">
        <Link href="/settings" className="nav-link">
          <FaCog className="nav-icon" />
          <span>Settings</span>
        </Link>
        <button className="theme-toggle">
          <FaMoon className="nav-icon" />
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar