import { useState, useEffect } from "react";
import "./Recordings.css";

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

function Recordings() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("ყველა");

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

          <li className="active">
            <NavLink
              to="/recordings"
              className="sidebar-link active-link"
            >
              <FaPlayCircle />
              <span>ჩანაწერები</span>
            </NavLink>
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

        <header className="recordings-header">

          <div className="recordings-left">

            <button
              className="recordings-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="ჩანაწერის ძებნა..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          <div className="recordings-right">

            <select
              className="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>ყველა</option>
              <option>React</option>
              <option>UI / UX</option>
              <option>Python</option>
              <option>Marketing</option>
            </select>

            <button className="primary-btn">
              <FaPlus />
              <span>ჩანაწერის დამატება</span>
            </button>

            <button
              className="recordings-theme-btn"
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
            <h4> ყველა ჩანაწერი</h4>
            <h2>248</h2>
            <p>ვიდეო</p>
          </div>

          <div className="stat-card">
            <h4> კურსები</h4>
            <h2>18</h2>
            <p>აქტიური</p>
          </div>

          <div className="stat-card">
            <h4> ნახვები</h4>
            <h2>48K</h2>
            <p>სულ</p>
          </div>

          <div className="stat-card">
            <h4> საათები</h4>
            <h2>356h</h2>
            <p>ვიდეო მასალა</p>
          </div>

        </section>

        {/* Video Catalog */}

        <section className="catalog-section">

          <div className="table-header">

            <h2> ვიდეო ბიბლიოთეკა</h2>

          </div>

          <div className="catalog-grid">

            {/* Card 1 */}

            <div className="video-card">

              <div className="video-thumbnail">

                <img
                  src="https://placehold.co/600x350"
                  alt=""
                />

                <span className="video-duration">
                  ⏱ 01:42:15
                </span>

                <button className="play-btn">
                  ▶
                </button>

              </div>

              <div className="video-content">

                <h3>React Masterclass</h3>

                <p>Frontend Development</p>

                <div className="video-meta">
                  <span> ლუკა ჩიჩუა</span>
                </div>

                <div className="video-meta">
                  <span>⭐ 4.9</span>
                  <span>👁 2,154</span>
                </div>

                <span className="status active">
                  Public
                </span>

                <div className="catalog-actions">

                  <button className="view-btn">
                    ყურება
                  </button>

                  <button className="edit-btn">
                    რედაქტირება
                  </button>

                </div>

              </div>

            </div>

            {/* Card 2 */}

            <div className="video-card">

              <div className="video-thumbnail">

                <img
                  src="https://placehold.co/600x350"
                  alt=""
                />

                <span className="video-duration">
                  ⏱ 58:20
                </span>

                <button className="play-btn">
                  ▶
                </button>

              </div>

              <div className="video-content">

                <h3>UI / UX Design</h3>

                <p>Figma Components</p>

                <div className="video-meta">
                  <span> ანა თოდუა</span>
                </div>

                <div className="video-meta">
                  <span>⭐ 4.8</span>
                  <span>👁 1,284</span>
                </div>

                <span className="status pending">
                  Private
                </span>

                <div className="catalog-actions">

                  <button className="view-btn">
                    ყურება
                  </button>

                  <button className="edit-btn">
                    რედაქტირება
                  </button>

                </div>

              </div>

            </div>

            {/* Card 3 */}

            <div className="video-card">

              <div className="video-thumbnail">

                <img
                  src="https://placehold.co/600x350"
                  alt=""
                />

                <span className="video-duration">
                  ⏱ 02:18:43
                </span>

                <button className="play-btn">
                  ▶
                </button>

              </div>

              <div className="video-content">

                <h3>Digital Marketing</h3>

                <p>Meta & Google Ads</p>

                <div className="video-meta">
                  <span> ნინო ბერიძე</span>
                </div>

                <div className="video-meta">
                  <span>⭐ 5.0</span>
                  <span>👁 4,812</span>
                </div>

                <span className="status active">
                  Public
                </span>

                <div className="catalog-actions">

                  <button className="view-btn">
                    ყურება
                  </button>

                  <button className="edit-btn">
                    რედაქტირება
                  </button>

                </div>

              </div>

            </div>

            {/* Card 4 */}

            <div className="video-card">

              <div className="video-thumbnail">

                <img
                  src="https://placehold.co/600x350"
                  alt=""
                />

                <span className="video-duration">
                  ⏱ 01:15:09
                </span>

                <button className="play-btn">
                  ▶
                </button>

              </div>

              <div className="video-content">

                <h3>Python Backend</h3>

                <p>Flask REST API</p>

                <div className="video-meta">
                  <span> გიორგი დავითაძე</span>
                </div>

                <div className="video-meta">
                  <span>⭐ 4.9</span>
                  <span>👁 3,025</span>
                </div>

                <span className="status active">
                  Public
                </span>

                <div className="catalog-actions">

                  <button className="view-btn">
                    ყურება
                  </button>

                  <button className="edit-btn">
                    რედაქტირება
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>
              </main>

    </div>
  );
}

export default Recordings;