import { useState } from "react";
import "./Login.css";
import api from "../../api/api";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
  email: formData.email,
  password: formData.password,
});

localStorage.setItem("token", response.data.token);
localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

alert("Login successful!");

    } catch (error) {
      console.log(error);

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
  <div className="login-page">
    <div className="login-card">

      <h1>შესვლა</h1>
      <p>კეთილი იყოს შენი დაბრუნება!</p>

        <form onSubmit={handleSubmit}>

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
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <a href="/forgot-password">
              პაროლი დაგავიწყდა?
            </a>
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            შესვლა
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
            Google-ით შესვლა
          </button>

          <button
            type="button"
            className="social-btn"
          >
            <FaFacebook />
            Facebook-ით შესვლა
          </button>

          <div className="register-link">
            არ გაქვს ანგარიში?
            <a href="/register"> რეგისტრაცია</a>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Login;