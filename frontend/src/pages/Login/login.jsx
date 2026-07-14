import { useState } from "react";
import "./Login.css";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>შესვლა</h1>
        <p>კეთილი იყოს შენი დაბრუნება!</p>

        <div className="input-group">
          <label>ელ. ფოსტა</label>

          <div className="input-box">
            <FaEnvelope />
            <input type="email" placeholder="example@email.com" />
          </div>
        </div>

        <div className="input-group">
          <label>პაროლი</label>

          <div className="input-box">
            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="პაროლი"
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

        <div className="forgot">
          <a href="#">პაროლი დაგავიწყდა?</a>
        </div>

        <button className="login-btn">შესვლა</button>

        <div className="divider">
          <span></span>
          <p>ან</p>
          <span></span>
        </div>

        <button className="social-btn">
          <FaGoogle className="google" />
          შესვლა Google-ით
        </button>

        <button className="social-btn">
          <FaFacebook className="facebook" />
          შესვლა Facebook-ით
        </button>

        <div className="register">
          არ გაქვს ანგარიში?
          <a href="/register"> რეგისტრაცია</a>
        </div>
      </div>
    </div>
  );
}