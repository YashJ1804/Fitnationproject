import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignIn.module.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      setToast({ show: true, message: data.message || "Login response received" });
      setTimeout(() => setToast({ show: false, message: "" }), 3000);

      if (data.success) {
        // ✅ SAVE USER
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ SAVE TOKEN (CRITICAL)
        localStorage.setItem("token", data.token);

        setShowSuccess(true);

        // Redirect
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1800);
      }
    } catch (err) {
      setToast({ show: true, message: "Server error. Try again." });
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundElements}>
        <div className={styles.floatingShape}></div>
        <div className={styles.floatingShape}></div>
        <div className={styles.floatingShape}></div>
      </div>

      <div className={styles.particles}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.particle}></div>
        ))}
      </div>

      {toast.show && (
        <div className={styles.toast}>
          <span>{toast.message}</span>
        </div>
      )}

      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successPopup}>
            <div className={styles.checkCircle}>
              <div className={styles.checkmark}>✓</div>
            </div>
            <h2 className={styles.successText}>Login Successful</h2>
          </div>
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.healthIconContainer}>
            <div className={styles.healthIcon}>
              <svg viewBox="0 0 24 24">
                <path d="M12 21s-6-4.35-9-8.28C-1.2 9.5.79 4 5.4 3.14A6 6 0 0 1 12 6a6 6 0 0 1 6.6-2.86C23.21 4 25.2 9.5 21 12.72C18 16.65 12 21 12 21z" />
              </svg>
            </div>
            <div className={styles.iconGlow}></div>
          </div>

          <h1 className={styles.title}>
            Welcome Back
            <span className={styles.titleSparkle}>✨</span>
          </h1>
          <p className={styles.subtitle}>
            Sign in to continue your <span className={styles.highlight}>health journey</span>
          </p>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>continue with email</span>
          <span className={styles.dividerLine}></span>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Email Address</label>
          <input
            className={styles.input}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Password</label>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.showPasswordBtn}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button className={styles.loginBtn} onClick={handleLogin}>
          Sign In
        </button>

        <p className={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/create-account" className={styles.primaryLink}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
