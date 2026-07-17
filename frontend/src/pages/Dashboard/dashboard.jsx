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

  const [sidebarOpen, setSidebarOpen] = useState(true);


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

      {/* Sidebar */}

      <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>

        <div className="logo">
          <h2>ედიტოლოგია</h2>
        </div>

        <ul>

          <li className="active">
            <FaTachometerAlt />
            მართვის პანელი
          </li>

         <li>
  <NavLink to="/courses"
    className={({ isActive }) =>
      isActive ? "sidebar-link active-link" : "sidebar-link"
    }
  >
    <FaBook />
    <span>კურსები</span>
  </NavLink>
</li>

          <li>
            <FaLayerGroup />
            გაკვეთილები
          </li>

          <li>
            <FaVideo />
            დამსწრე ჯგუფები?
          </li>

          <li>
            <FaPlayCircle />
            ჩანაწერები
          </li>

          <li>
            <FaUserGraduate />
            სტუდენტები
          </li>

          <li>
            <FaCreditCard />
            გადახდები
          </li>

          <li>
            <FaImages />
            გალერეა
          </li>

          <li>
            <FaFileAlt />
            სილაბუსი
          </li>

          <li>
            <FaEnvelope />
            კონტაქტი
          </li>

          <li>
            <FaCog />
            პარამეტრები
          </li>

          <li className="logout">
            <FaSignOutAlt />
            გასვლა
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
            <p>თვის</p>
          </div>

        </section>

        {/* Recent Students */}

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

                <th>ელფოსტა</th>

                <th>კურსი</th>

                <th>სტატუსი</th>

                <th>სტატისტიკა</th>

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

                <td>john@gmail.com</td>

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