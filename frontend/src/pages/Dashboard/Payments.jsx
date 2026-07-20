import { useState, useEffect } from "react";
import "./Payments.css";

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
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Payments() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [course, setCourse] = useState("ყველა კურსი");

  const [status, setStatus] = useState("ყველა სტატუსი");

  const [method, setMethod] = useState("ყველა მეთოდი");

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
             <NavLink to="/Payments" className="sidebar-link">
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
                placeholder="გადახდის ან სტუდენტის ძებნა..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          <div className="right-header">

        

            <select
              className="category-filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>ყველა სტატუსი</option>
              <option>გადახდილი</option>
              <option>ნაწილობრივ</option>
              <option>ვადაგადაცილებული</option>
            </select>

            <select
              className="category-filter"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>ყველა მეთოდი</option>
              <option>Bank of Georgia</option>
              <option>TBC Bank</option>
              <option>PayPal</option>
            </select>

            <button className="primary-btn">
              <FaPlus />
              <span>გადახდის დამატება</span>
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
            <h4>დღევანდელი შემოსავალი</h4>
            <h2>₾ 1700</h2>
            <p>+18% გუშინდელთან შედარებით</p>
          </div>

          <div className="stat-card">
            <h4>თვის შემოსავალი</h4>
            <h2>₾ 30000</h2>
            <p>128 წარმატებული გადახდა</p>
          </div>

          <div className="stat-card">
            <h4>გადამხდელი სტუდენტები</h4>
            <h2>182</h2>
            <p>აქტიური სტუდენტები</p>
          </div>

          <div className="stat-card">
            <h4>დავალიანება</h4>
            <h2>18</h2>
            <p>გადასახდელი დარჩა</p>
          </div>

        </section>

        {/* Payment Methods */}

        <section className="payment-methods">

          {/* Bank of Georgia */}

          <div className="payment-card bog">

            <div className="payment-top">
              <div>
                <span className="payment-icon"></span>
                <h3>Bank of Georgia</h3>
              </div>

              <span className="payment-status online">
                ● Online
              </span>
            </div>

            <h1>₾ 7500</h1>

            <p>42 წარმატებული გადახდა</p>

            <div className="payment-footer">

              <span>საბანკო გადარიცხვა</span>

              <button className="payment-btn">
                დეტალები
              </button>

            </div>

          </div>

          {/* TBC */}

          <div className="payment-card tbc">

            <div className="payment-top">
              <div>
                <span className="payment-icon"></span>
                <h3>TBC Bank</h3>
              </div>

              <span className="payment-status online">
                ● Online
              </span>
            </div>

            <h1>₾ 5000</h1>

            <p>31 წარმატებული გადახდა</p>

            <div className="payment-footer">

              <span>ბანკის გადარიცხვა</span>

              <button className="payment-btn">
                დეტალები
              </button>

            </div>

          </div>

          {/* PayPal */}

          <div className="payment-card paypal">

            <div className="payment-top">
              <div>
                <span className="payment-icon"></span>
                <h3>PayPal</h3>
              </div>

              <span className="payment-status online">
                ● Connected
              </span>
            </div>

            <h1>€ 2,420</h1>

            <p>18 საერთაშორისო გადახდა</p>

            <div className="payment-footer">

              <span>International</span>

              <button className="payment-btn">
                დეტალები
              </button>

            </div>

          </div>

        </section>
                {/* Payments Table */}

        <section className="table-section">

          <div className="table-header">

            <h2>გადახდების ისტორია</h2>

            <div className="table-actions">

              <button className="secondary-btn">
                 PDF
              </button>

              <button className="secondary-btn">
                 Excel
              </button>

              <button className="secondary-btn">
                 CSV
              </button>

            </div>

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

                  <th>თანხა</th>

                  <th>მეთოდი</th>

                  <th>თარიღი</th>

                  <th>სტატუსი</th>

                  <th>ქვითარი</th>

                  <th>მოქმედებები</th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td><input type="checkbox" /></td>

                  <td>მარიამ კოვზაძე</td>

                  <td>Frontend Development</td>

                  <td>₾450</td>

                  <td>
                    <span className="method bog-method">
                       BOG
                    </span>
                  </td>

                  <td>21/07/2026</td>

                  <td>
                    <span className="status active">
                      გადახდილი
                    </span>
                  </td>

                  <td>

                    <button className="receipt-btn">
                       PDF
                    </button>

                  </td>

                  <td>

                    <button className="view-btn">👁</button>

                    <button className="edit-btn">✏️</button>

                    <button className="delete-btn">🗑️</button>

                  </td>

                </tr>

                <tr>

                  <td><input type="checkbox" /></td>

                  <td>ნინო ბერიძე</td>

                  <td>UI / UX Design</td>

                  <td>₾380</td>

                  <td>
                    <span className="method tbc-method">
                       TBC
                    </span>
                  </td>

                  <td>19/07/2026</td>

                  <td>
                    <span className="status pending">
                      ნაწილობრივ
                    </span>
                  </td>

                  <td>

                    <button className="receipt-btn">
                       PDF
                    </button>

                  </td>

                  <td>

                    <button className="view-btn">👁</button>

                    <button className="edit-btn">✏️</button>

                    <button className="delete-btn">🗑️</button>

                  </td>

                </tr>

                <tr>

                  <td><input type="checkbox" /></td>

                  <td>გიორგი ლომიძე</td>

                  <td>Python Backend</td>

                  <td>€150</td>

                  <td>
                    <span className="method paypal-method">
                       PayPal
                    </span>
                  </td>

                  <td>17/07/2026</td>

                  <td>
                    <span className="status active">
                      გადახდილი
                    </span>
                  </td>

                  <td>

                    <button className="receipt-btn">
                       PDF
                    </button>

                  </td>

                  <td>

                    <button className="view-btn">👁</button>

                    <button className="edit-btn">✏️</button>

                    <button className="delete-btn">🗑️</button>

                  </td>

                </tr>

                <tr>

                  <td><input type="checkbox" /></td>

                  <td>ლაშა ქავთარაძე</td>

                  <td>Digital Marketing</td>

                  <td>₾520</td>

                  <td>
                    <span className="method bog-method">
                       BOG
                    </span>
                  </td>

                  <td>15/07/2026</td>

                  <td>
                    <span className="status inactive">
                      ვადაგადაცილებული
                    </span>
                  </td>

                  <td>

                    <button className="receipt-btn">
                       PDF
                    </button>

                  </td>

                  <td>

                    <button className="view-btn">👁</button>

                    <button className="edit-btn">✏️</button>

                    <button className="delete-btn">🗑️</button>

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

export default Payments;