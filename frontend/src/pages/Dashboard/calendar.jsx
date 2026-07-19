import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Calendar.css";

import {
  FaMoon,
  FaSun,
  FaBars,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
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

function Calendar() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const months = [
    "იანვარი",
    "თებერვალი",
    "მარტი",
    "აპრილი",
    "მაისი",
    "ივნისი",
    "ივლისი",
    "აგვისტო",
    "სექტემბერი",
    "ოქტომბერი",
    "ნოემბერი",
    "დეკემბერი",
  ];

  const [currentMonth, setCurrentMonth] = useState(6);
  const currentYear = 2026;

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
            <NavLink to="/offlinecourse" className="sidebar-link">
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

      {/* Main */}

      <main className="main-content">

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
                placeholder="ღონისძიების ძებნა..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          <div className="right-header">

            {/* Month */}

            <div className="month-navigation">

              <button
                className="month-btn"
                onClick={() =>
                  setCurrentMonth(
                    currentMonth === 0
                      ? 11
                      : currentMonth - 1
                  )
                }
              >
                <FaChevronLeft />
              </button>

              <h3>
                {months[currentMonth]} {currentYear}
              </h3>

              <button
                className="month-btn"
                onClick={() =>
                  setCurrentMonth(
                    currentMonth === 11
                      ? 0
                      : currentMonth + 1
                  )
                }
              >
                <FaChevronRight />
              </button>

            </div>

            <button className="primary-btn">
              <FaPlus />
              <span>ღონისძიების დამატება</span>
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
                {/* Calendar */}

        <section className="calendar-section">

          <div className="calendar-grid">

            {/* Week Days */}

            <div className="calendar-weekday">ორშ</div>
            <div className="calendar-weekday">სამ</div>
            <div className="calendar-weekday">ოთხ</div>
            <div className="calendar-weekday">ხუთ</div>
            <div className="calendar-weekday">პარ</div>
            <div className="calendar-weekday">შაბ</div>
            <div className="calendar-weekday">კვი</div>

            {/* Row 1 */}

            <div className="calendar-cell empty"></div>

            <div className="calendar-cell empty"></div>

            <div className="calendar-cell">
              <span className="day-number">1</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">2</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">3</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">4</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">5</span>
            </div>

            {/* Row 2 */}

            <div className="calendar-cell">
              <span className="day-number">6</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">7</span>

              <div className="calendar-event purple">
                09:00 React
              </div>

              <div className="calendar-event blue">
                15:00 Meeting
              </div>
            </div>

            <div className="calendar-cell">
              <span className="day-number">8</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">9</span>

              <div className="calendar-event green">
                UI/UX
              </div>
            </div>

            <div className="calendar-cell">
              <span className="day-number">10</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">11</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">12</span>
            </div>

            {/* Row 3 */}

            <div className="calendar-cell">
              <span className="day-number">13</span>

              <div className="calendar-event orange">
                JavaScript
              </div>
            </div>

            <div className="calendar-cell">
              <span className="day-number">14</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">15</span>

              <div className="calendar-event red">
                Zoom Live
              </div>
            </div>

            <div className="calendar-cell">
              <span className="day-number">16</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">17</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">18</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">19</span>
            </div>

            {/* Row 4 */}

            <div className="calendar-cell">
              <span className="day-number">20</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">21</span>

              <div className="calendar-event purple">
                Premiere Pro
              </div>
            </div>

            <div className="calendar-cell">
              <span className="day-number">22</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">23</span>

              <div className="calendar-event blue">
                After Effects
              </div>
            </div>

            <div className="calendar-cell">
              <span className="day-number">24</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">25</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">26</span>
            </div>

            {/* Row 5 */}

            <div className="calendar-cell">
              <span className="day-number">27</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">28</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">29</span>

              <div className="calendar-event green">
                Editing Class
              </div>
            </div>

            <div className="calendar-cell">
              <span className="day-number">30</span>
            </div>

            <div className="calendar-cell">
              <span className="day-number">31</span>

              <div className="calendar-event red">
                Live Webinar
              </div>
            </div>

            <div className="calendar-cell empty"></div>

            <div className="calendar-cell empty"></div>

          </div>

        </section>
                {/* Today's Schedule */}

        <section className="table-section">

          <div className="table-header">
            <h2>დღევანდელი განრიგი</h2>

            <button className="primary-btn">
              <FaPlus />
              <span>განრიგის დამატება</span>
            </button>
          </div>

          <table>

            <thead>
              <tr>
                <th>დრო</th>
                <th>გაკვეთილი</th>
                <th>ლექტორი</th>
                <th>სტუდენტები</th>
                <th>ფორმატი</th>
                <th>სტატუსი</th>
                <th>მოქმედება</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>09:00</td>
                <td>React Masterclass</td>
                <td>ლუკა ჩიჩუა</td>
                <td>28</td>
                <td>Zoom</td>

                <td>
                  <span className="status active">
                    მიმდინარეობს
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
                <td>12:00</td>
                <td>UI / UX</td>
                <td>ანა თოდუა</td>
                <td>17</td>
                <td>Live</td>

                <td>
                  <span className="status pending">
                    დაგეგმილი
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
                <td>15:00</td>
                <td>JavaScript</td>
                <td>ნიკა მაისურაძე</td>
                <td>31</td>
                <td>Zoom</td>

                <td>
                  <span className="status active">
                    მიმდინარეობს
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
                <td>18:00</td>
                <td>Premiere Pro</td>
                <td>გიორგი ბერიძე</td>
                <td>22</td>
                <td>Live</td>

                <td>
                  <span className="status pending">
                    დაგეგმილი
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

export default Calendar;