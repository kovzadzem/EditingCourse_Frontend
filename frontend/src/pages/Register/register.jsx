import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

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

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // EMAIL REGISTRATION
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;

    // FIRST NAME
    if (firstName.length < 2) {
      alert("სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.");
      return;
    }

    // LAST NAME
    if (lastName.length < 2) {
      alert("გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.");
      return;
    }

    // PASSWORD VALIDATION
    // მინიმუმ 10 სიმბოლო, ერთი ასო, ერთი ციფრი,
    // ერთი სპეციალური სიმბოლო და არ უნდა შეიცავდეს გამოტოვებებს.
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{10,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "პაროლი უნდა შეიცავდეს:\n\n" +
          "• მინიმუმ 10 სიმბოლოს\n" +
          "• მინიმუმ ერთ ასოს\n" +
          "• მინიმუმ ერთ ციფრს\n" +
          "• მინიმუმ ერთ სპეციალურ სიმბოლოს (!, @, #)"
      );
      return;
    }

    // CONFIRM PASSWORD
    if (password !== formData.confirmPassword) {
      alert("პაროლები არ ემთხვევა!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "რეგისტრაცია ვერ მოხერხდა."
        );
      }

      alert(
        data.message ||
          "რეგისტრაცია წარმატებით დასრულდა!\n\n" +
            "შეამოწმე ელფოსტა და დაადასტურე ანგარიში."
      );

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      const message = (error.message || "").toLowerCase();

      if (
        message.includes("password must contain") ||
        message.includes("password must be at least")
      ) {
        alert(
          "პაროლი არ აკმაყოფილებს მოთხოვნებს.\n\n" +
            "გამოიყენე მინიმუმ 10 სიმბოლო, ასო, ციფრი " +
            "და სპეციალური სიმბოლო."
        );
      } else if (
        message.includes("already registered") ||
        message.includes("already exists") ||
        message.includes("already in use")
      ) {
        alert("ეს ელფოსტა უკვე რეგისტრირებულია.");
      } else if (
        message.includes("failed to fetch") ||
        message.includes("networkerror")
      ) {
        alert(
          "სერვერთან დაკავშირება ვერ მოხერხდა.\n" +
            "შეამოწმე, მუშაობს თუ არა ბექენდი."
        );
      } else {
        alert(error.message || "რეგისტრაცია ვერ მოხერხდა.");
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE REGISTRATION
  // =========================

  const handleGoogleRegister = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  // =========================
  // FACEBOOK REGISTRATION
  // =========================

  const handleFacebookRegister = () => {
    window.location.href = `${API_URL}/auth/facebook`;
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>რეგისტრაცია</h1>

        <p>შექმენი ახალი ანგარიში</p>

        <form onSubmit={handleSubmit}>
          {/* FIRST NAME */}
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
                autoComplete="given-name"
                minLength={2}
                required
              />
            </div>
          </div>

          {/* LAST NAME */}
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
                autoComplete="family-name"
                minLength={2}
                required
              />
            </div>
          </div>

          {/* EMAIL */}
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
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* PHONE */}
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
                autoComplete="tel"
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>პაროლი</label>

            <div className="input-box">
              <FaLock />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="შექმენი პაროლი"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={10}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "პაროლის დამალვა" : "პაროლის ჩვენება"
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="input-group">
            <label>გაიმეორე პაროლი</label>

            <div className="input-box">
              <FaLock />

              <input
                type={
                  showConfirmPassword ? "text" : "password"
                }
                name="confirmPassword"
                placeholder="გაიმეორე პაროლი"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={10}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                aria-label={
                  showConfirmPassword
                    ? "პაროლის დამალვა"
                    : "პაროლის ჩვენება"
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

          {/* TERMS */}
          <div className="terms">
            <input
              type="checkbox"
              id="accept-terms"
              required
            />

            <label htmlFor="accept-terms">
              ვეთანხმები{" "}
              <Link to="/">წესებს</Link> და{" "}
              <Link to="/">
                კონფიდენციალურობის პოლიტიკას
              </Link>
            </label>
          </div>

          {/* REGISTER */}
          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? "რეგისტრაცია..." : "რეგისტრაცია"}
          </button>

          {/* DIVIDER */}
          <div className="divider">
            <span></span>
            <p>ან</p>
            <span></span>
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            className="social-btn"
            onClick={handleGoogleRegister}
          >
            <FaGoogle />
            Google-ით რეგისტრაცია
          </button>

          {/* FACEBOOK */}
          <button
            type="button"
            className="social-btn"
            onClick={handleFacebookRegister}
          >
            <FaFacebook />
            Facebook-ით რეგისტრაცია
          </button>

          {/* LOGIN */}
          <div className="login-link">
            უკვე გაქვს ანგარიში?
            <Link to="/login"> შესვლა</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;