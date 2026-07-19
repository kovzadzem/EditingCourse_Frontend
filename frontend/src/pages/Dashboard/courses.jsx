import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Courses.css";

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

function Courses() {

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
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="კურსის ძებნა..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          <div className="right-header">

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
                {/* Toolbar */}

        <section className="courses-toolbar">

          <select
            className="category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>ყველა</option>
            <option>პროგრამირება</option>
            <option>დიზაინი</option>
            <option>მარკეტინგი</option>
            <option>ბიზნესი</option>
          </select>

          <button className="primary-btn">
            <FaPlus />
            <span>კურსის დამატება</span>
          </button>

        </section>

        {/* Cards */}

        <section className="stats-grid">

          <div className="stat-card">
            <h4>კურსების რაოდენობა</h4>
            <h2>18</h2>
            <p>სულ სისტემაში</p>
          </div>

          <div className="stat-card">
            <h4>აქტიური კურსები</h4>
            <h2>12</h2>
            <p>გამოქვეყნებული</p>
          </div>

          <div className="stat-card">
            <h4>მოლოდინში</h4>
            <h2>6</h2>
            <p>ჯერ არ გამოქვეყნებულა</p>
          </div>

          <div className="stat-card">
            <h4>სტუდენტები</h4>
            <h2>1254</h2>
            <p>ჩარიცხული სტუდენტები</p>
          </div>

        </section>

        {/* Table */}

        <section className="table-section">

          <div className="table-header">

            <h2>ყველა კურსი</h2>

            <button className="primary-btn">
              <FaPlus />
              <span>ახალი კურსი</span>
            </button>

          </div>

          <table>

            <thead>

              <tr>
                <th>სურათი</th>
                <th>კურსი</th>
                <th>კატეგორია</th>
                <th>ლექტორი</th>
                <th>სტუდენტები</th>
                <th>ფასი</th>
                <th>სტატუსი</th>
                <th>მოქმედება</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td>
                  <img
                    src="https://placehold.co/60x60"
                    alt="Course"
                    className="course-image"
                  />
                </td>

                <td>React Masterclass</td>

                <td>პროგრამირება</td>

                <td>ლუკა ჩიჩუა</td>

                <td>320</td>

                <td>$89</td>

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
                    src="https://placehold.co/60x60"
                    alt="Course"
                    className="course-image"
                  />
                </td>

                <td>UI / UX დიზაინი</td>

                <td>დიზაინი</td>

                <td>ანა თოდუა</td>

                <td>185</td>

                <td>$75</td>

                <td>
                  <span className="status pending">
                    არააქტიური
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
                    src="https://placehold.co/60x60"
                    alt="Course"
                    className="course-image"
                  />
                </td>

                <td>Digital Marketing</td>

                <td>მარკეტინგი</td>

                <td>ნიკა მაისურაძე</td>

                <td>240</td>

                <td>$99</td>

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

export default Courses;