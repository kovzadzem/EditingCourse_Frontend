import { useState, useEffect } from "react";
import "./Students.css";

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

import { NavLink } from "react-router-dom";

function Students() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [course, setCourse] = useState("ყველა კურსი");

  const [group, setGroup] = useState("ყველა ჯგუფი");

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
            <NavLink to="/dashboard" className="sidebar-link">
              <FaTachometerAlt />
              <span>მართვის პანელი</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/courses" className="sidebar-link">
              <FaBook />
              <span>კურსები</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/calendar" className="sidebar-link">
              <FaCalendarAlt />
              <span>კალენდარი</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/offline-course" className="sidebar-link">
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

          <li className="active">
            <NavLink
              to="/students"
              className="sidebar-link active-link"
            >
              <FaUserGraduate />
              <span>სტუდენტები</span>
            </NavLink>
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
                placeholder="სტუდენტის ძებნა..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          <div className="right-header">

            <select
              className="category-filter"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option>ყველა კურსი</option>
              <option>Frontend Development</option>
              <option>UI / UX Design</option>
              <option>Python Backend</option>
              <option>Digital Marketing</option>
            </select>

            <select
              className="category-filter"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option>ყველა ჯგუფი</option>
              <option>ჯგუფი A</option>
              <option>ჯგუფი B</option>
              <option>ჯგუფი C</option>
            </select>

           

            <button className="primary-btn">
              <FaPlus />
              <span>სტუდენტის დამატება</span>
            </button>

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
            <h4> სტუდენტები</h4>
            <h2>248</h2>
            <p>სულ სტუდენტი</p>
          </div>

          <div className="stat-card">
            <h4>აქტიური</h4>
            <h2>213</h2>
            <p>აქტიური სტუდენტი</p>
          </div>

          <div className="stat-card">
            <h4> საშუალო დასწრება</h4>
            <h2>91%</h2>
            <p>ყველა კურსი</p>
          </div>

          <div className="stat-card">
            <h4> გაცდენები</h4>
            <h2>34</h2>
            <p>ამ თვეში</p>
          </div>

        </section>

        {/* Students Table */}

        <section className="table-section">

          <div className="table-header">

            <h2> სტუდენტების სია</h2>

            <button className="primary-btn">
              <FaPlus />
              <span>სტუდენტის დამატება</span>
            </button>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    <input type="checkbox" />
                  </th>

                  <th>სტუდენტი</th>

                  <th>კურსი</th>

                  <th>ჯგუფი</th>

                  <th>ტელეფონი</th>

                  <th>Email</th>

                  <th>დასწრება</th>

                  <th>გაცდენა</th>

                  <th>სტატუსი</th>

                  <th>მოქმედებები</th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td><input type="checkbox" /></td>

                  <td>
                    <div className="student-info">
                      <img
                        src="https://i.pravatar.cc/100?img=11"
                        alt=""
                      />
                      <div>
                        <h4>გიგი</h4>
                        <span>ID: ST001</span>
                      </div>
                    </div>
                  </td>

                  <td>Frontend</td>

                  <td>A</td>

                  <td>+995 555 111111</td>

                  <td>gigi@mail.com</td>

                  <td>

                    <div className="progress">

                      <div
                        className="progress-fill green"
                        style={{ width: "96%" }}
                      />

                    </div>

                    <span>96%</span>

                  </td>

                  <td>1</td>

                  <td>
                    <span className="status active">
                      აქტიური
                    </span>
                  </td>

                  <td>

                    <button className="view-btn">
                      👁
                    </button>

                    <button className="edit-btn">
                      ✏️
                    </button>

                    <button className="delete-btn">
                      🗑
                    </button>

                  </td>

                </tr>

                <tr>

                  <td><input type="checkbox" /></td>

                  <td>
                    <div className="student-info">
                      <img
                        src="https://i.pravatar.cc/100?img=22"
                        alt=""
                      />
                      <div>
                        <h4>ნინო ბერიძე</h4>
                        <span>ID: ST002</span>
                      </div>
                    </div>
                  </td>

                  <td>UI / UX</td>

                  <td>B</td>

                  <td>+995 555 222222</td>

                  <td>nino@mail.com</td>

                  <td>

                    <div className="progress">

                      <div
                        className="progress-fill yellow"
                        style={{ width: "82%" }}
                      />

                    </div>

                    <span>82%</span>

                  </td>

                  <td>4</td>

                  <td>
                    <span className="status pending">
                      გაფრთხილება
                    </span>
                  </td>

                  <td>

                    <button className="view-btn">👁</button>

                    <button className="edit-btn">✏️</button>

                    <button className="delete-btn">🗑</button>

                  </td>

                </tr>

                <tr>

                  <td><input type="checkbox" /></td>

                  <td>
                    <div className="student-info">
                      <img
                        src="https://i.pravatar.cc/100?img=31"
                        alt=""
                      />
                      <div>
                        <h4>ანა ლომიძე</h4>
                        <span>ID: ST003</span>
                      </div>
                    </div>
                  </td>

                  <td>Python</td>

                  <td>C</td>

                  <td>+995 555 333333</td>

                  <td>ana@mail.com</td>

                  <td>

                    <div className="progress">

                      <div
                        className="progress-fill red"
                        style={{ width: "61%" }}
                      />

                    </div>

                    <span>61%</span>

                  </td>

                  <td>9</td>

                  <td>
                    <span className="status inactive">
                      არააქტიური
                    </span>
                  </td>

                  <td>

                    <button className="view-btn">👁</button>

                    <button className="edit-btn">✏️</button>

                    <button className="delete-btn">🗑</button>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </section>
              </main>

    </div>
  );
}

export default Students;