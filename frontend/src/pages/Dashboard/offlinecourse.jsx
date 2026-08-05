import { useState, useEffect } from "react";
import "./OfflineCourse.css";

import {
  FaMoon,
  FaSun,
  FaSearch,
  FaPlus,
  FaBell,
  FaUserCircle,
  FaBars,
  FaTachometerAlt,
  FaBook,
  FaCalendarAlt,
  FaPlayCircle,
  FaUserGraduate,
  FaCreditCard,
  FaImages,
  FaFileAlt,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function OfflineCourse() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ყველა");

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

      {sidebarOpen && (
        <div
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>

        <div className="logo">
          <h2>ედიტოლოგია</h2>
        </div>

        <ul>

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
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
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              <FaBook />
              <span>კურსები</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              <FaCalendarAlt />
              <span>კალენდარი</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/offline-course"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              <FaUsers />
              <span>დამსწრე ჯგუფები</span>
            </NavLink>
          </li>

          <li>
            <FaPlayCircle />
            <span>ჩანაწერები</span>
          </li>

          <li>
            <FaUserGraduate />
            <span>სტუდენტები</span>
          </li>

          <li>
            <FaCreditCard />
            <span>გადახდები</span>
          </li>

          <li>
            <FaImages />
            <span>გალერეა</span>
          </li>

          <li>
            <FaFileAlt />
            <span>სილაბუსი</span>
          </li>

          <li>
            <FaEnvelope />
            <span>კონტაქტი</span>
          </li>

          <li>
            <FaCog />
            <span>პარამეტრები</span>
          </li>

          <li className="logout">
            <FaSignOutAlt />
            <span>გასვლა</span>
          </li>

        </ul>

      </aside>

      <main className="main-content">

        <header className="offlinecourse-header">

          <div className="offlinecourse-left">

            <button
              className="offlinecourse-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="ჯგუფის ძებნა..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          <div className="offlinecourse-right">

            <select
              className="category-filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>ყველა</option>
              <option>აქტიური</option>
              <option>დასრულებული</option>
              <option>დაგეგმილი</option>
            </select>

            <button className="primary-btn">
              <FaPlus />
              <span>ჯგუფის დამატება</span>
            </button>

            <button
              className="offlinecourse-theme-btn"
              onClick={() => setDarkMode(!darkMode)}
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
                {/* Statistics Cards */}

        <section className="stats-grid">

          <div className="stat-card">
            <h4>დამსწრე ჯგუფები</h4>
            <h2>24</h2>
            <p>ჯამური რაოდენობა</p>
          </div>

          <div className="stat-card">
            <h4>აქტიური ჯგუფები</h4>
            <h2>16</h2>
            <p>მიმდინარე სწავლება</p>
          </div>

          <div className="stat-card">
            <h4>სტუდენტები</h4>
            <h2>352</h2>
            <p>ჩარიცხული სტუდენტი</p>
          </div>

          <div className="stat-card">
            <h4>ლექტორები</h4>
            <h2>12</h2>
            <p>აქტიური ლექტორი</p>
          </div>

        </section>

        {/* Groups Table */}

        <section className="table-section">

          <div className="table-header">

            <h2>დამსწრე ჯგუფები</h2>

            <button className="primary-btn">
              <FaPlus />
              <span>ახალი ჯგუფი</span>
            </button>

          </div>

          <table>

            <thead>

              <tr>
                <th>ჯგუფი</th>
                <th>კურსი</th>
                <th>ლექტორი</th>
                <th>სტუდენტები</th>
                <th>დაწყება</th>
                <th>დასრულება</th>
                <th>სტატუსი</th>
                <th>მოქმედება</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td>Frontend A1</td>

                <td>React</td>

                <td>ლუკა ჩიჩუა</td>

                <td>24</td>

                <td>05.09.2026</td>

                <td>05.12.2026</td>

                <td>
                  <span className="status active">
                    აქტიური
                  </span>
                </td>

                <td>

                   <button className="view-btn">
                    👁
                  </button>

                  <button className="delete-btn">
                    🗑
                  </button>

                </td>

              </tr>

              <tr>

                <td>Video Editing Pro</td>

                <td>Premiere Pro</td>

                <td>ანა თოდუა</td>

                <td>18</td>

                <td>15.09.2026</td>

                <td>20.12.2026</td>

                <td>
                  <span className="status pending">
                    დაგეგმილი
                  </span>
                </td>

                <td>

                  <button className="view-btn">
                    👁
                  </button>

                  <button className="delete-btn">
                    🗑
                  </button>

                </td>

              </tr>

              <tr>

                <td>Graphic Design</td>

                <td>Photoshop</td>

                <td>ნინო ბერიძე</td>

                <td>20</td>

                <td>10.06.2026</td>

                <td>10.09.2026</td>

                <td>
                  <span className="status inactive">
                    დასრულებული
                  </span>
                </td>

                <td>

                   <button className="view-btn">
                    👁
                  </button>

                  <button className="delete-btn">
                    🗑
                  </button>

                </td>

              </tr>
                            <tr>

                <td>Motion Graphics</td>

                <td>After Effects</td>

                <td>გიორგი კაპანაძე</td>

                <td>15</td>

                <td>01.10.2026</td>

                <td>20.12.2026</td>

                <td>
                  <span className="status active">
                    აქტიური
                  </span>
                </td>

                <td>
 <button className="view-btn">
                    👁
                  </button>

                  <button className="delete-btn">
                    🗑
                  </button>

                </td>

              </tr>

              <tr>

                <td>UI/UX Design</td>

                <td>Figma</td>

                <td>მარიამ გელაშვილი</td>

                <td>21</td>

                <td>12.10.2026</td>

                <td>12.01.2027</td>

                <td>
                  <span className="status pending">
                    დაგეგმილი
                  </span>
                </td>

                <td>

                <button className="view-btn">
                    👁
                  </button>

                  <button className="delete-btn">
                    🗑
                  </button>

                </td>

              </tr>

              <tr>

                <td>Content Creator</td>

                <td>Social Media</td>

                <td>თამარ ჯაფარიძე</td>

                <td>19</td>

                <td>05.05.2026</td>

                <td>05.08.2026</td>

                <td>
                  <span className="status inactive">
                    დასრულებული
                  </span>
                </td>

                <td>

                  <button className="view-btn">
                    👁
                  </button>

                  <button className="delete-btn">
                    🗑
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

export default OfflineCourse;