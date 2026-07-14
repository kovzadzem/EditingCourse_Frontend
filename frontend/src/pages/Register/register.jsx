import { useState } from "react";
import "./Register.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>რეგისტრაცია</h1>
        <p>შექმენი ახალი ანგარიში</p>

        <form>
          <div className="input-group">
            <label>სახელი</label>
            <div className="input-box">
              <FaUser />
              <input type="text" placeholder="სახელი" />
            </div>
          </div>

          <div className="input-group">
            <label>გვარი</label>
            <div className="input-box">
              <FaUser />
              <input type="text" placeholder="გვარი" />
            </div>
          </div>

          <div className="input-group">
            <label>ელ. ფოსტა</label>
            <div className="input-box">
              <FaEnvelope />
              <input type="email" placeholder="example@email.com" />
            </div>
          </div>

          <div className="input-group">
            <label>ტელეფონის ნომერი</label>
            <div className="input-box">
              <FaPhone />
              <input type="tel" placeholder="+995 555 12 34 56" />
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

          <div className="input-group">
            <label>პაროლის დადასტურება</label>
            <div className="input-box">
              <FaLock />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="გაიმეორე პაროლი"
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="terms">
            <input type="checkbox" id="terms" />

            <label htmlFor="terms">
              ვეთანხმები წესებსა და კონფიდენციალურობის პოლიტიკას
            </label>
          </div>

          <button className="register-btn">
            რეგისტრაცია
          </button>

          <div className="divider">
            <span></span>
            <p>ან</p>
            <span></span>
          </div>

          <button type="button" className="social-btn">
            <FaGoogle />
            Google-ით რეგისტრაცია
          </button>

          <button type="button" className="social-btn">
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