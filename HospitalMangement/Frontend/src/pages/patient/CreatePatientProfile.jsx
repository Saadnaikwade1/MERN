import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const CreatePatientProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [data, setData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    bloodGroup: ""
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/patients/profile");
        if (res.data) setProfile(res.data);
      } catch {
        console.log("No profile found");
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/patients/profile", data);
      setMsg("✅ Profile created successfully");
      setTimeout(() => navigate("/patient"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loadingProfile) {
    return <p style={styles.loading}>Loading...</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>
          {profile ? "My Profile" : "Create Patient Profile"}
        </h2>

        {/* SHOW PROFILE */}
        {profile ? (
          <div style={styles.card}>
            <ProfileRow label="Name" value={profile.name} />
            <ProfileRow label="Age" value={profile.age} />
            <ProfileRow label="Gender" value={profile.gender} />
            <ProfileRow label="Phone" value={profile.phone} />
            <ProfileRow label="Address" value={profile.address} />
            <ProfileRow label="Blood Group" value={profile.bloodGroup} />
          </div>
        ) : (
          /* SHOW FORM */
          <form style={styles.form} onSubmit={submitHandler}>
            {msg && <p style={styles.success}>{msg}</p>}
            {error && <p style={styles.error}>{error}</p>}

            <input name="name" placeholder="Full Name" onChange={handleChange} required style={styles.input} />
            <input name="age" placeholder="Age" onChange={handleChange} required style={styles.input} />

            <select name="gender" onChange={handleChange} required style={styles.input}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input name="phone" placeholder="Phone Number" onChange={handleChange} required style={styles.input} />
            <input name="address" placeholder="Address" onChange={handleChange} required style={styles.input} />
            <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} required style={styles.input} />

            <button
              type="submit"
              disabled={loading}
              style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <p style={styles.row}>
    <strong>{label}:</strong> {value}
  </p>
);

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f0fdfa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  container: {
    background: "#ffffff",
    padding: "28px",
    borderRadius: "14px",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)"
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#0f766e",
    fontSize: "24px"
  },

  card: {
    lineHeight: "1.9",
    fontSize: "15px",
    color: "#334155"
  },

  row: {
    marginBottom: "8px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none"
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#0f766e",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer"
  },

  success: {
    background: "#dcfce7",
    color: "#166534",
    padding: "8px",
    borderRadius: "6px",
    textAlign: "center"
  },

  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "8px",
    borderRadius: "6px",
    textAlign: "center"
  },

  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
    color: "#0f766e"
  }
};

export default CreatePatientProfile;
