import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { supabase } from "../../supabase";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

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

  // =========================
  // EMAIL / PASSWORD LOGIN
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = formData.email.trim();

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password: formData.password,
        });

      if (error) {
        throw error;
      }

      // Email confirmation
      if (!data.user?.email_confirmed_at) {
        await supabase.auth.signOut();

        alert(
          "ელფოსტა ჯერ არ არის დადასტურებული.\n\n" +
            "გთხოვ, შეამოწმე ელფოსტა და დაადასტურე ანგარიში."
        );

        return;
      }

      // =========================
      // PROFILE
      // =========================

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.error(
          "PROFILE ERROR:",
          profileError
        );
      }

      // =========================
      // LOCAL STORAGE
      // =========================

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.user,
          profile: profile || null,
        })
      );

      alert(
        "ავტორიზაცია წარმატებით დასრულდა!"
      );

      navigate("/profile");

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      const message =
        error.message?.toLowerCase() || "";

      if (
        message.includes(
          "email not confirmed"
        )
      ) {
        alert(
          "ელფოსტა ჯერ არ არის დადასტურებული.\n\n" +
            "შეამოწმე შენი ელფოსტა."
        );
      } else if (
        message.includes(
          "invalid login credentials"
        )
      ) {
        alert(
          "ელფოსტა ან პაროლი არასწორია."
        );
      } else {
        alert(
          error.message ||
            "ავტორიზაცია ვერ მოხერხდა."
        );
      }
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================

  const handleGoogleLogin = async () => {
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
        "GOOGLE LOGIN ERROR:",
        error
      );

      alert(
        error.message ||
          "Google-ით შესვლა ვერ მოხერხდა."
      );
    }
  };

  // =========================
  // FACEBOOK LOGIN
  // =========================

  const handleFacebookLogin = async () => {
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
        "FACEBOOK LOGIN ERROR:",
        error
      );

      alert(
        error.message ||
          "Facebook-ით შესვლა ვერ მოხერხდა."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>შესვლა</h1>

        <p>
          კეთილი იყოს შენი დაბრუნება!
        </p>

        <form onSubmit={handleSubmit}>

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

          {/* FORGOT PASSWORD */}

          <div className="forgot-password">

            <Link to="/forgot-password">
              პაროლი დაგავიწყდა?
            </Link>

          </div>

          {/* LOGIN */}

          <button
            type="submit"
            className="login-btn"
          >
            შესვლა
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
            onClick={handleGoogleLogin}
          >

            <FaGoogle />

            Google-ით შესვლა

          </button>

          {/* FACEBOOK */}

          <button
            type="button"
            className="social-btn"
            onClick={handleFacebookLogin}
          >

            <FaFacebook />

            Facebook-ით შესვლა

          </button>

          {/* REGISTER */}

          <div className="register-link">

            არ გაქვს ანგარიში?

            <Link to="/register">
              {" "}რეგისტრაცია
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;