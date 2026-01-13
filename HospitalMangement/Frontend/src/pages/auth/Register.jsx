import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔐 Password strength check
  const isStrongPassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isStrongPassword(form.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number."
      );
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", form);
      setSuccess(res.data.message || "Registration successful");

      // ⏩ Auto redirect to login
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={submitHandler} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <input
          style={styles.input}
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          style={styles.input}
          placeholder="Email"
          autoComplete="username"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          style={styles.input}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="receptionist">Receptionist</option>
        </select>

        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1
          }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f766e, #5eead4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  heading: {
    textAlign: "center",
    color: "#0f766e"
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    backgroundColor: "#0f766e",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600"
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center"
  },
  success: {
    color: "green",
    fontSize: "14px",
    textAlign: "center"
  }
};

export default Register;
