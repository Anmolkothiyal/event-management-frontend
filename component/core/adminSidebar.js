"use client";
import UseAuthHook from "@/hooks/useAuthHook";
import PageRoutes from "@/utilis/PageRoute";
import Link from "next/link";
import { FaUsers, FaCalendar, FaTicketAlt, FaComment, FaChartBar, FaCog, FaMoon } from "react-icons/fa";


const AdminSidebar = () => {
const {handleLogout}=UseAuthHook()
  return (
    <>
      <div className="admin-sidebar desktop-only">
        <div className="sidebar-content">
          <h1 className="sidebar-title">Admin Panel</h1>
          {/* <p className="menu-label">Menu</p> */}
          <nav className="nav-menu">
            <Link href={PageRoutes.ADMINDASBOARD()} className="nav-link">
              <FaChartBar className="nav-icon"/>
              <span>Dashboard</span>
            </Link>
            <Link href={PageRoutes.USER()} className="nav-link">
              <FaUsers className="nav-icon" />
              <span>Users</span>
            </Link>
            <Link href={PageRoutes.EVENT()} className="nav-link">
              <FaCalendar className="nav-icon" />
              <span>Events</span>
            </Link>
            <Link href={PageRoutes.TICKET()} className="nav-link">
              <FaTicketAlt className="nav-icon" />
              <span>Tickets</span>
            </Link>
            <Link href={PageRoutes.FEEDBACK()} className="nav-link">
              <FaComment className="nav-icon"/>
              <span>Feedback</span>
            </Link>
          </nav>
        </div>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="nav-link">
            <FaCog className="nav-icon" />
            <span>Logout</span>
          </button>
          {/* <button className="theme-toggle">
            <FaMoon className="nav-icon" />
          </button> */}
        </div>
      </div>

      {/* Footer for Mobile */}
      <div className="mobile-footer mobile-only">
        <Link href={PageRoutes.ADMINDASBOARD()} className="nav-link">
          <FaChartBar className="nav-icon" />
          <span>Dashboard</span>
        </Link>
        <Link href={PageRoutes.USER()} className="nav-link">
          <FaUsers className="nav-icon" color="white" />
          <span>Users</span>
        </Link>
        <Link href={PageRoutes.EVENT()} className="nav-link">
          <FaCalendar className="nav-icon" />
          <span>Events</span>
        </Link>
        <Link href={PageRoutes.TICKET()} className="nav-link">
          <FaTicketAlt className="nav-icon" />
          <span>Tickets</span>
        </Link>
        <Link href={PageRoutes.FEEDBACK()} className="nav-link">
          <FaComment className="nav-icon" />
          <span>Feedback</span>
        </Link>
      </div>
    </>
  );
};

export default AdminSidebar;
