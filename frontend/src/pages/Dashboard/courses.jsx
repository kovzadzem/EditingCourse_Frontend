import { useState, useEffect } from "react";
import "./Courses.css";


import {
  FaMoon,
  FaSun,
  FaSearch,
  FaPlus,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

function Courses() {
 

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

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
    <div className="courses-page">

      {/* Header */}

      <header className="courses-header">

        <div className="header-left">

          <h1>კურსების მართვა</h1>

        </div>

        <div className="header-right">

          {/* Theme */}

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>


          {/* Notifications */}

          <button className="notification-btn">
            <FaBell />
          </button>

          {/* Profile */}

          <div className="admin-profile">
            <FaUserCircle />
            <span>Admin</span>
          </div>

        </div>

      </header>

      {/* Top Controls */}

      <section className="courses-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

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

        <button className="add-course-btn">
          <FaPlus />
          კურსის დამატება
        </button>

      </section>
            {/* Statistics Cards */}

      <section className="course-stats">

        <div className="course-card">
          <h4>კურსების რაოდენობა</h4>
          <h2>18</h2>
          <p>ჯამი</p>
        </div>

        <div className="course-card">
          <h4>აქტიური</h4>
          <h2>12</h2>
          <p>გამოქვეყნებული</p>
        </div>

        <div className="course-card">
          <h4>სამომავლო კურსები</h4>
          <h2>6</h2>
          <p>მომლოდინე</p>
        </div>

        <div className="course-card">
          <h4>სტუდენტების ჯამი</h4>
          <h2>1,254</h2>
          <p>ჩარიცხული სტუდენტები</p>
        </div>

      </section>

      {/* Courses Table */}

      <section className="courses-table-section">

        <div className="table-header">

          <h2>ყველა კურსი </h2>

        </div>

        <table>

          <thead>

            <tr>

              <th>გალერეა</th>

              <th>კურსი</th>

              <th>კატეგორია</th>

              <th>ლექტორი</th>

              <th>სტუდენტი</th>

              <th>ფასი</th>

              <th>სტატუსი</th>

              <th>აქტიურობა</th>

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

              <td>მასტერკლასები</td>

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

                <button className="view-btn">
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

              <td>UI/UX დიზაინი</td>

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

                <button className="view-btn">
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

              <td>ციფრული მარკეტინგი</td>

              <td>მარკეტინგი</td>

              <td>ნიკოლოზ მაისურაძე</td>

              <td>240</td>

              <td>$99</td>

              <td>
                <span className="status active">
                  მოლოდინში
                </span>
              </td>

              <td>

                <button className="view-btn">
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

    </div>
  );
}

export default Courses;