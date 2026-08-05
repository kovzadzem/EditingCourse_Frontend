import { FaBars, FaSearch, FaMoon, FaSun, FaBell, FaUserCircle } from "react-icons/fa";

function DashboardHeader({
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  setDarkMode,
  search,
  setSearch,
}) {
  return (
<header className="dashboard-header">
      <div className="dashboard-left">

        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="ძებნა..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      <div className="dashboard-right">

        <button
          className="dashboard-theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button className="notification-btn">
          <FaBell />
        </button>

        <div className="admin-profile">
          <FaUserCircle />

          <div>
            <h4>Admin</h4>
            <small>Administrator</small>
          </div>
        </div>

      </div>

    </header>
  );
}

export default DashboardHeader;