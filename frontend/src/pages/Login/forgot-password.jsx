import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { supabase } from "../../supabase";
import "./login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo:
              window.location.origin +
              "/reset-password",
          }
        );

      if (error) {
        throw error;
      }

      alert(
        "პაროლის აღდგენის ბმული გაიგზავნა ელფოსტაზე."
      );
    } catch (error) {
      console.error(
        "RESET EMAIL ERROR:",
        error
      );

      alert(
        error.message ||
          "პაროლის აღდგენის ბმულის გაგზავნა ვერ მოხერხდა."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>
          დაგავიწყდა პაროლი?
        </h1>

        <p>
          შეიყვანე შენი ელფოსტა და მიიღე
          პაროლის აღდგენის ბმული.
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
                placeholder="example@email.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

          </div>

          {/* RESET BUTTON */}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "იგზავნება..."
              : "აღდგენის ბმულის გაგზავნა"}
          </button>

          {/* BACK TO LOGIN */}

          <div className="register-link">

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