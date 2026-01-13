import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminNavbar from "../../components/AdminNavbar";

const CreateDoctor = () => {
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    userId: "",
    specialization: "",
    experience: "",
    availableDays: "",
    consultationFee: ""
  });

  const fetchApprovedDoctors = async () => {
    try {
      const res = await api.get("/admin/approved-doctors");
      setApprovedDoctors(res.data);
    } catch (err) {
      setError("Failed to load doctors");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/doctors", {
        userId: form.userId,
        specialization: form.specialization,
        experience: Number(form.experience),
        availableDays: form.availableDays.split(","),
        consultationFee: Number(form.consultationFee)
      });

      setMessage("Doctor profile created successfully");
      setForm({
        userId: "",
        specialization: "",
        experience: "",
        availableDays: "",
        consultationFee: ""
      });
    } catch (err) {
      setError("Doctor profile creation failed");
    }
  };

  useEffect(() => {
    fetchApprovedDoctors();
  }, []);

  return (
    <>

      <div style={styles.container}>
        <h2 style={styles.heading}>Create Doctor Profile</h2>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <form style={styles.form} onSubmit={submitHandler}>
          <select
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
            required
            style={styles.input}
          >
            <option value="">Select Approved Doctor</option>
            {approvedDoctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} ({doc.email})
              </option>
            ))}
          </select>

          <input
            placeholder="Specialization"
            value={form.specialization}
            onChange={(e) =>
              setForm({ ...form, specialization: e.target.value })
            }
            required
            style={styles.input}
          />

          <input
            placeholder="Experience (years)"
            type="number"
            value={form.experience}
            onChange={(e) =>
              setForm({ ...form, experience: e.target.value })
            }
            required
            style={styles.input}
          />

          <input
            placeholder="Available Days (Mon,Tue,Wed)"
            value={form.availableDays}
            onChange={(e) =>
              setForm({ ...form, availableDays: e.target.value })
            }
            required
            style={styles.input}
          />

          <input
            placeholder="Consultation Fee"
            type="number"
            value={form.consultationFee}
            onChange={(e) =>
              setForm({ ...form, consultationFee: e.target.value })
            }
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Create Doctor
          </button>
        </form>
      </div>
    </>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0fdfa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 16px"
  },
  heading: {
    marginBottom: "20px",
    color: "#0f766e",
    fontSize: "26px",
    fontWeight: "600"
  },
  form: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  button: {
    padding: "12px",
    backgroundColor: "#0f766e",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer"
  },
  success: {
    color: "green",
    marginBottom: "10px",
    textAlign: "center"
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center"
  }
};

export default CreateDoctor;
