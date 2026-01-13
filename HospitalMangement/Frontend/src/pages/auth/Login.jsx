import { useContext, useState } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);

      if (res.data.role === "admin") navigate("/admin");
      if (res.data.role === "doctor") navigate("/doctor");
      if (res.data.role === "receptionist") navigate("/receptionist");
      if (res.data.role === "patient") navigate("/patient");
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Server not reachable. Try again later.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={submitHandler} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        {errorMsg && <p style={styles.error}>{errorMsg}</p>}

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" style={styles.button}>
          Login
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
    width: "75%",
    maxWidth: "380px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
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
  }
};

export default Login;
