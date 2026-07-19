import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";


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
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Sidebar თავიდან დახურული
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className="dashboard">

      {/* Overlay */}

      {sidebarOpen && (
        <div
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>

  <div className="logo">
    <h2>ედიტოლოგია</h2>
  </div>

  <ul>

    <li>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "sidebar-link active-link" : "sidebar-link"
        }
      >
        <FaTachometerAlt />
        <span>მართვის პანელი</span>
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/courses"
        className={({ isActive }) =>
          isActive ? "sidebar-link active-link" : "sidebar-link"
        }
      >
        <FaBook />
        <span>კურსები</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/lessons" className="sidebar-link">
        <FaLayerGroup />
        <span>გაკვეთილები</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/live-groups" className="sidebar-link">
        <FaVideo />
        <span>დამსწრე ჯგუფები</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/recordings" className="sidebar-link">
        <FaPlayCircle />
        <span>ჩანაწერები</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/students" className="sidebar-link">
        <FaUserGraduate />
        <span>სტუდენტები</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/payments" className="sidebar-link">
        <FaCreditCard />
        <span>გადახდები</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/gallery" className="sidebar-link">
        <FaImages />
        <span>გალერეა</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/syllabus" className="sidebar-link">
        <FaFileAlt />
        <span>სილაბუსი</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/contact" className="sidebar-link">
        <FaEnvelope />
        <span>კონტაქტი</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/settings" className="sidebar-link">
        <FaCog />
        <span>პარამეტრები</span>
      </NavLink>
    </li>

    <li className="logout">
      <NavLink to="/login" className="sidebar-link">
        <FaSignOutAlt />
        <span>გასვლა</span>
      </NavLink>
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
              onClick={() =>
                setSidebarOpen(!sidebarOpen)
              }
            >
              <FaBars />
            </button>

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="ძებნა..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          <div className="right-header">

            <button
              className="theme-btn"
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button className="notification-btn">
              <FaBell />
            </button>

            <div className="admin-profile">
              <FaUserCircle />

              <div className="admin-info">
                <h4>Admin</h4>
                <span>Administrator</span>
              </div>

            </div>

          </div>

        </header>

        {/* Cards */}

        <section className="stats-grid">

          <div className="stat-card">
            <h4>სტუდენტების რაოდენობა</h4>
            <h2>1,254</h2>
            <p>+12% მიმდინარე თვეში</p>
          </div>

          <div className="stat-card">
            <h4>კურსები</h4>
            <h2>18</h2>
            <p>4 აქტიური</p>
          </div>

          <div className="stat-card">
            <h4>მიმდინარე ჯგუფები</h4>
            <h2>12</h2>
            <p>2 მიმდინარეობს ახლა</p>
          </div>

          <div className="stat-card">
            <h4>შემოსავალი</h4>
            <h2>$24,580</h2>
            <p>ამ თვეში</p>
          </div>

        </section>

        {/* Table */}

        <section className="table-section">

          <div className="table-header">

            <h2>დამატებული სტუდენტები</h2>

            <button className="primary-btn">
              + სტუდენტის დამატება
            </button>

          </div>

          <table>

            <thead>

              <tr>
                <th>სახელი</th>
                <th>ელ.ფოსტა</th>
                <th>კურსი</th>
                <th>სტატუსი</th>
                <th>მოქმედებები</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td>ნიკა მაისურაძე</td>
                <td>nika@gmail.com</td>
                <td>React</td>

                <td>
                  <span className="status active">
                    აქტიური
                  </span>
                </td>

                <td>

                  <button className="edit-btn">
                    რედაქტირება
                  </button>

                  <button className="delete-btn">
                    წაშლა
                  </button>

                </td>

              </tr>

              <tr>

                <td>ლუკა</td>
                <td>luka@gmail.com</td>
                <td>JavaScript</td>

                <td>
                  <span className="status pending">
                    მოლოდინში
                  </span>
                </td>

                <td>

                  <button className="edit-btn">
                    რედაქტირება
                  </button>

                  <button className="delete-btn">
                    წაშლა
                  </button>

                </td>

              </tr>

              <tr>

                <td>ანა თოდუა</td>
                <td>ana@gmail.com</td>
                <td>UI/UX</td>

                <td>
                  <span className="status active">
                    აქტიური
                  </span>
                </td>

                <td>

                  <button className="edit-btn">
                    რედაქტირება
                  </button>

                  <button className="delete-btn">
                    წაშლა
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