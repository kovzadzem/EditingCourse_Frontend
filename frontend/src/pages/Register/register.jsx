import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
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

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // EMAIL REGISTRATION
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName =
      formData.firstName.trim();

    const lastName =
      formData.lastName.trim();

    const email =
      formData.email.trim();

    const phone =
      formData.phone.trim();

    // PASSWORD MATCH
    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("პაროლები არ ემთხვევა!");
      return;
    }

    // FIRST NAME
    if (firstName.length < 2) {
      alert(
        "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს."
      );
      return;
    }

    // LAST NAME
    if (lastName.length < 2) {
      alert(
        "გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს."
      );
      return;
    }

    // PASSWORD
    if (formData.password.length < 8) {
      alert(
        "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს."
      );
      return;
    }

    try {
      const { data, error } =
        await supabase.auth.signUp({
          email,
          password: formData.password,

          options: {
            emailRedirectTo:
              window.location.origin +
              "/login",

            data: {
              first_name: firstName,
              last_name: lastName,
              phone: phone,
            },
          },
        });

      if (error) {
        throw error;
      }

      console.log(
        "REGISTER RESPONSE:",
        data
      );

      // =========================
      // PROFILE
      // =========================

      if (data.user) {
        const {
          error: profileError,
        } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            avatar: null,
          });

        if (profileError) {
          console.error(
            "PROFILE ERROR:",
            profileError
          );
        }
      }

      alert(
        "რეგისტრაცია წარმატებით დასრულდა!\n\n" +
          "შეამოწმე ელფოსტა და დაადასტურე ანგარიში."
      );

      navigate("/login");

    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error
      );

      const message =
        error.message?.toLowerCase() || "";

      if (
        message.includes(
          "user already registered"
        )
      ) {
        alert(
          "ეს ელფოსტა უკვე რეგისტრირებულია."
        );
      } else {
        alert(
          error.message ||
            "რეგისტრაცია ვერ მოხერხდა."
        );
      }
    }
  };

  // =========================
  // GOOGLE REGISTER
  // =========================

  const handleGoogleRegister = async () => {
    try {
      const { error } =
        await supabase.auth.signInWithOAuth({
          provider: "google",

          options: {
            redirectTo:
              window.location.origin +
              "/profile",
          },
        });

      if (error) {
        throw error;
      }

    } catch (error) {
      console.error(
        "GOOGLE REGISTER ERROR:",
        error
      );

      alert(
        error.message ||
          "Google-ით რეგისტრაცია ვერ მოხერხდა."
      );
    }
  };

  // =========================
  // FACEBOOK REGISTER
  // =========================

  const handleFacebookRegister = async () => {
    try {
      const { error } =
        await supabase.auth.signInWithOAuth({
          provider: "facebook",

          options: {
            redirectTo:
              window.location.origin +
              "/profile",
          },
        });

      if (error) {
        throw error;
      }

    } catch (error) {
      console.error(
        "FACEBOOK REGISTER ERROR:",
        error
      );

      alert(
        error.message ||
          "Facebook-ით რეგისტრაცია ვერ მოხერხდა."
      );
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>რეგისტრაცია</h1>

        <p>
          შექმენი ახალი ანგარიში
        </p>

        <form onSubmit={handleSubmit}>

          {/* FIRST NAME */}

          <div className="input-group">

            <label>
              სახელი
            </label>

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

          {/* LAST NAME */}

          <div className="input-group">

            <label>
              გვარი
            </label>

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

          {/* EMAIL */}

          <div className="input-group">

            <label>
              ელ. ფოსტა
            </label>

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

          {/* PHONE */}

          <div className="input-group">

            <label>
              ტელეფონის ნომერი
            </label>

            <div className="input-box">

              <FaPhone />

              <input
                type="tel"
                name="phone"
                placeholder="+995 555 12 34 56"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="input-group">

            <label>
              პაროლი
            </label>

            <div className="input-box">

              <FaLock />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
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
                  setShowPassword(
                    !showPassword
                  )
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

          {/* CONFIRM PASSWORD */}

          <div className="input-group">

            <label>
              გაიმეორე პაროლი
            </label>

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
                value={
                  formData.confirmPassword
                }
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

          {/* TERMS */}

          <div className="terms">

            <input
              type="checkbox"
              required
            />

            <label>
              ვეთანხმები{" "}
              <Link to="/">
                წესებს
              </Link>{" "}
              და{" "}
              <Link to="/">
                კონფიდენციალურობის
                პოლიტიკას
              </Link>
            </label>

          </div>

          {/* REGISTER */}

          <button
            type="submit"
            className="register-btn"
          >
            რეგისტრაცია
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

            <Link to="/login">
              {" "}შესვლა
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Register;