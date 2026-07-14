import { useState, useEffect } from "react";
import "./Dashboard.css";
import { useTranslation } from "react-i18next";

import {
  FaMoon,
  FaSun,
  FaBars,
  FaSearch,
  FaTachometerAlt,
  FaBook,
  FaLayerGroup,
  FaVideo,
  FaPlayCircle,
  FaUserGraduate,
  FaCreditCard,
  FaImages,
  FaFileAlt,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

function Dashboard() {
  const { i18n } = useTranslation();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [showLanguages, setShowLanguages] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setShowLanguages(false);
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}

      <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>

        <div className="logo">
          <h2>Recepto CMS</h2>
        </div>

        <ul>

          <li className="active">
            <FaTachometerAlt />
            Dashboard
          </li>

          <li>
            <FaBook />
            Courses
          </li>

          <li>
            <FaLayerGroup />
            Sections & Lessons
          </li>

          <li>
            <FaVideo />
            Live Groups
          </li>

          <li>
            <FaPlayCircle />
            Live Recordings
          </li>

          <li>
            <FaUserGraduate />
            Students
          </li>

          <li>
            <FaCreditCard />
            Payments
          </li>

          <li>
            <FaImages />
            Gallery
          </li>

          <li>
            <FaFileAlt />
            Syllabus
          </li>

          <li>
            <FaEnvelope />
            Contact Messages
          </li>

          <li>
            <FaCog />
            Website Settings
          </li>

          <li className="logout">
            <FaSignOutAlt />
            Logout
          </li>

        </ul>

      </aside>

      {/* Main */}

      <main className="main-content">

        {/* Header */}

        <header className="header">

          <div className="left-header">

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
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          <div className="right-header">

            {/* Theme */}

            <button
              className="theme-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Language */}

            <div className="language-container">

              <button
                className="lang-btn"
                onClick={() =>
                  setShowLanguages(!showLanguages)
                }
              >
                {i18n.language === "ka" ? "🇬🇪" : "🇬🇧"}
              </button>

              {showLanguages && (

                <div className="language-menu">

                  <button
                    onClick={() => changeLanguage("ka")}
                  >
                    🇬🇪 ქართული
                  </button>

                  <button
                    onClick={() => changeLanguage("en")}
                  >
                    🇬🇧 English
                  </button>

                </div>

              )}

            </div>

            <button className="notification-btn">
              <FaBell />
            </button>

            <div className="admin-profile">
              <FaUserCircle />
              <span>Admin</span>
            </div>

          </div>

        </header> 
                {/* Dashboard Cards */}

        <section className="stats-grid">

          <div className="stat-card">
            <h4>Total Students</h4>
            <h2>1,254</h2>
            <p>+12% this month</p>
          </div>

          <div className="stat-card">
            <h4>Courses</h4>
            <h2>18</h2>
            <p>4 Active</p>
          </div>

          <div className="stat-card">
            <h4>Live Groups</h4>
            <h2>12</h2>
            <p>2 Running Now</p>
          </div>

          <div className="stat-card">
            <h4>Revenue</h4>
            <h2>$24,580</h2>
            <p>This Month</p>
          </div>

        </section>

        {/* Recent Students */}

        <section className="table-section">

          <div className="table-header">

            <h2>Recent Students</h2>

            <button className="primary-btn">
              + Add Student
            </button>

          </div>

          <table>

            <thead>

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Course</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>Mariam Kovzadze</td>

                <td>mariam@email.com</td>

                <td>React</td>

                <td>
                  <span className="status active">
                    Active
                  </span>
                </td>

                <td>

                  <button className="edit-btn">
                    Edit
                  </button>

                  <button className="delete-btn">
                    Delete
                  </button>

                </td>

              </tr>

              <tr>

                <td>John Smith</td>

                <td>john@email.com</td>

                <td>JavaScript</td>

                <td>
                  <span className="status pending">
                    Pending
                  </span>
                </td>

                <td>

                  <button className="edit-btn">
                    Edit
                  </button>

                  <button className="delete-btn">
                    Delete
                  </button>

                </td>

              </tr>

              <tr>

                <td>Ana Brown</td>

                <td>ana@email.com</td>

                <td>UI/UX</td>

                <td>
                  <span className="status active">
                    Active
                  </span>
                </td>

                <td>

                  <button className="edit-btn">
                    Edit
                  </button>

                  <button className="delete-btn">
                    Delete
                  </button>

                </td>

              </tr>

            </tbody>

          </table>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;