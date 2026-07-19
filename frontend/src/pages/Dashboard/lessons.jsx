import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Lessons.css";

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
} from "react-icons/fa";

function Lessons() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [course, setCourse] = useState("ყველა");

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
              to="/lessons"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active-link"
                  : "sidebar-link"
              }
            >
              <FaLayerGroup />
              <span>გაკვეთილები</span>
            </NavLink>
          </li>

          <li>
            <FaVideo />
            <span>დამსწრე ჯგუფები</span>
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
                placeholder="გაკვეთილის ძებნა..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <select
              className="category-filter"
              value={course}
              onChange={(e) =>
                setCourse(e.target.value)
              }
            >
              <option>ყველა</option>
              <option>React</option>
              <option>JavaScript</option>
              <option>UI / UX</option>
              <option>Marketing</option>
            </select>

          </div>

          <div className="right-header">

            <button className="primary-btn">
              <FaPlus />
              <span>გაკვეთილის დამატება</span>
            </button>

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
                {/* Statistics */}

        <section className="stats-grid">

          <div className="stat-card">
            <h4>გაკვეთილების რაოდენობა</h4>
            <h2>124</h2>
            <p>სულ ატვირთულია</p>
          </div>

          <div className="stat-card">
            <h4>აქტიური გაკვეთილები</h4>
            <h2>98</h2>
            <p>ხელმისაწვდომი</p>
          </div>

          <div className="stat-card">
            <h4>დრაფტები</h4>
            <h2>15</h2>
            <p>გამოსაქვეყნებელი</p>
          </div>

          <div className="stat-card">
            <h4>სულ ნახვები</h4>
            <h2>25,430</h2>
            <p>ყველა გაკვეთილი</p>
          </div>

        </section>

        {/* Table */}

        <section className="table-section">

          <div className="table-header">

            <h2>ყველა გაკვეთილი</h2>

            <button className="primary-btn">
              <FaPlus />
              <span>ახალი გაკვეთილი</span>
            </button>

          </div>

          <table>

            <thead>

              <tr>
                <th>Thumbnail</th>
                <th>გაკვეთილი</th>
                <th>კურსი</th>
                <th>ხანგრძლივობა</th>
                <th>ნახვები</th>
                <th>სტატუსი</th>
                <th>მოქმედება</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td>
                  <img
                    src="https://placehold.co/70x50"
                    alt="Lesson"
                    className="course-image"
                  />
                </td>

                <td>React Hooks</td>

                <td>React</td>

                <td>24 წუთი</td>

                <td>1,250</td>

                <td>
                  <span className="status active">
                    აქტიური
                  </span>
                </td>

                <td>

                  <button className="edit-btn">
                    ნახვა
                  </button>

                  <button className="delete-btn">
                    წაშლა
                  </button>

                </td>

              </tr>

              <tr>

                <td>
                  <img
                    src="https://placehold.co/70x50"
                    alt="Lesson"
                    className="course-image"
                  />
                </td>

                <td>JavaScript DOM</td>

                <td>JavaScript</td>

                <td>32 წუთი</td>

                <td>860</td>

                <td>
                  <span className="status pending">
                    დრაფტი
                  </span>
                </td>

                <td>

                  <button className="edit-btn">
                    ნახვა
                  </button>

                  <button className="delete-btn">
                    წაშლა
                  </button>

                </td>

              </tr>

              <tr>

                <td>
                  <img
                    src="https://placehold.co/70x50"
                    alt="Lesson"
                    className="course-image"
                  />
                </td>

                <td>Flexbox Layout</td>

                <td>HTML / CSS</td>

                <td>18 წუთი</td>

                <td>2,450</td>

                <td>
                  <span className="status active">
                    აქტიური
                  </span>
                </td>

                <td>

                  <button className="edit-btn">
                    ნახვა
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

export default Lessons;