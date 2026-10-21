
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";
import { supabase } from "../../supabase";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (firstName.length < 2) {
      alert("სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.");
      return;
    }

    if (lastName.length < 2) {
      alert("გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.");
      return;
    }

    if (!phone) {
      alert("გთხოვ, შეიყვანე ტელეფონის ნომერი.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{10,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "პაროლი უნდა შეიცავდეს:\n\n" +
          "• მინიმუმ 10 სიმბოლოს\n" +
          "• მინიმუმ ერთ ლათინურ ასოს\n" +
          "• მინიმუმ ერთ ციფრს\n" +
          "• მინიმუმ ერთ სპეციალურ სიმბოლოს (!, @, #)\n" +
          "• არ უნდა შეიცავდეს გამოტოვებებს."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("პაროლები არ ემთხვევა!");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone,
          },
        },
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error("მომხმარებლის შექმნა ვერ მოხერხდა.");
      }

      // Confirm email გამორთული უნდა იყოს Supabase-ში.
      // თუ სესია შეიქმნა, მომხმარებელი უკვე შესულია.
      if (data.session) {
        alert("რეგისტრაცია წარმატებით დასრულდა!");

        navigate("/profile", {
          replace: true,
        });
      } else {
        // თუ სესია არ შეიქმნა, შესვლა ავტომატურად ვერ მოხერხდა.
        alert(
          "ანგარიში შეიქმნა, მაგრამ აქტიური სესია არ დაბრუნებულა. " +
            "შეამოწმე Supabase-ის Email confirmation პარამეტრი."
        );

        navigate("/login", {
          replace: true,
        });
      }
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      const message = (error.message || "").toLowerCase();

      if (
        message.includes("already registered") ||
        message.includes("already exists") ||
        message.includes("already in use")
      ) {
        alert("ეს ელფოსტა უკვე რეგისტრირებულია.");
      } else if (
        message.includes("password") ||
        message.includes("weak")
      ) {
        alert(
          "პაროლი არ აკმაყოფილებს მოთხოვნებს. " +
            "შეამოწმე მისი სიგრძე და სიმბოლოები."
        );
      } else if (
        message.includes("fetch") ||
        message.includes("network")
      ) {
        alert(
          "Supabase-ს ვერ დავუკავშირდით. " +
            "შეამოწმე .env ფაილი და ინტერნეტი."
        );
      } else {
        alert(error.message || "რეგისტრაცია ვერ მოხერხდა.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    if (loading) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/profile`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error(`${provider.toUpperCase()} ERROR:`, error);

      alert(error.message || "ავტორიზაცია ვერ მოხერხდა.");
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>რეგისტრაცია</h1>
        <p>შექმენი ახალი ანგარიში</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">სახელი</label>
            <div className="input-box">
              <FaUser />
              <input
                id="firstName"
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

          <div className="input-group">
            <label htmlFor="lastName">გვარი</label>
            <div className="input-box">
              <FaUser />
              <input
                id="lastName"
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

          <div className="input-group">
            <label htmlFor="email">ელ. ფოსტა</label>
            <div className="input-box">
              <FaEnvelope />
              <input
                id="email"
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

          <div className="input-group">
            <label htmlFor="phone">ტელეფონის ნომერი</label>
            <div className="input-box">
              <FaPhone />
              <input
                id="phone"
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

          <div className="input-group">
            <label htmlFor="password">პაროლი</label>
            <div className="input-box">
              <FaLock />
              <input
                id="password"
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
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword
                    ? "პაროლის დამალვა"
                    : "პაროლის ჩვენება"
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">
              გაიმეორე პაროლი
            </label>
            <div className="input-box">
              <FaLock />
              <input
                id="confirmPassword"
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

          <div className="terms">
            <input
              type="checkbox"
              id="accept-terms"
              required
            />
            <label htmlFor="accept-terms">
              ვეთანხმები <Link to="/">წესებს</Link> და{" "}
              <Link to="/">კონფიდენციალურობის პოლიტიკას</Link>
            </label>
          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? "რეგისტრაცია..." : "რეგისტრაცია"}
          </button>

          <div className="divider">
            <span></span>
            <p>ან</p>
            <span></span>
          </div>

          <button
            type="button"
            className="social-btn"
            onClick={() => handleOAuth("google")}
            disabled={loading}
          >
            <FaGoogle />
            Google-ით რეგისტრაცია
          </button>

          <button
            type="button"
            className="social-btn"
            onClick={() => handleOAuth("facebook")}
            disabled={loading}
          >
            <FaFacebook />
            Facebook-ით რეგისტრაცია
          </button>

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
