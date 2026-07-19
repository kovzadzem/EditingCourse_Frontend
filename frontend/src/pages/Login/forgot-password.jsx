import { useState, useEffect } from "react";
import { FaEnvelope, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "./login.css";

function ForgotPassword() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/forgot-password", {
        email,
      });

      alert("Password reset link sent successfully.");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Backend is not responding.");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="theme-toggle">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <h1>დაგავიწყდა პაროლი?
        </h1>

        <p>
          შეიყვანე შენი ელფოსტა და დაელოდე ბმულს.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email</label>

            <div className="input-box">
              <FaEnvelope />

              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="register-btn"
          >
            აღდგენის ბმულის გაგზავნა
          </button>

          <div className="login-link">
            <Link to="/login">
              ავტორიზაციაზე დაბრუნება
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}

export default ForgotPassword;