import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import api from "../../api/api";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("პაროლები არ ემთხვევა!");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        avatar: formData.avatar,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("რეგისტრაცია წარმატებით დასრულდა!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          `Status: ${error.response.status}\n\n${JSON.stringify(
            error.response.data,
            null,
            2
          )}`
        );
      } else if (error.request) {
        alert("Backend არ პასუხობს.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="theme-toggle">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <h1>რეგისტრაცია</h1>
        <p>შექმენი ახალი ანგარიში</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>სახელი</label>

            <div className="input-box">
              <FaUser />

              <input
                type="text"
                name="firstName"
                placeholder="შეიყვანე სახელი"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>გვარი</label>

            <div className="input-box">
              <FaUser />

              <input
                type="text"
                name="lastName"
                placeholder="შეიყვანე გვარი"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>ელ. ფოსტა</label>

            <div className="input-box">
              <FaEnvelope />

              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>ტელეფონის ნომერი</label>

            <div className="input-box">
              <FaPhone />

              <input
                type="tel"
                name="phone"
                placeholder="+995 555 12 34 56"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label>პაროლი</label>

            <div className="input-box">
              <FaLock />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="პაროლი"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>გაიმეორე პაროლი</label>

            <div className="input-box">
              <FaLock />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="გაიმეორე პაროლი"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          <div className="terms">
            <input type="checkbox" required />

            <label>
              ვეთანხმები
              <a href="/"> წესებს</a> და
              <a href="/"> კონფიდენციალურობის პოლიტიკას</a>
            </label>
          </div>

          <button
            type="submit"
            className="register-btn"
          >
            რეგისტრაცია
          </button>

          <div className="divider">
            <span></span>
            <p>ან</p>
            <span></span>
          </div>

      
           <button
  type="button"
  className="social-btn"
  onClick={() => {
    window.location.href =
      "http://localhost:3000/auth/google";
  }}
>
  <FaGoogle />
  Google-ით რეგისტრაცია
</button>

          <button
            type="button"
            className="social-btn"
          >
            <FaFacebook />
            Facebook-ით რეგისტრაცია
          </button>

          <div className="login-link">
            უკვე გაქვს ანგარიში?
            <a href="/login"> შესვლა</a>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Register;