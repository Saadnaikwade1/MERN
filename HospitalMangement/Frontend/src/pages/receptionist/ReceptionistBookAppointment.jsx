import { useEffect, useState } from "react";
import api from "../../api/axios";

const TIME_SLOTS = [
  "10:00","10:30","11:00","11:30","12:00",
  "17:00","17:30","18:00"
];

const ReceptionistBookAppointment = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [data, setData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: ""
  });

  useEffect(() => {
    api.get("/patients").then(res => setPatients(res.data));
    api.get("/doctors").then(res => setDoctors(res.data));
  }, []);

  const isDayAllowed = (date, days) => {
    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "short"
    });
    return days.includes(day);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      await api.post("/appointments/book", data);
      setMsg("Appointment booked successfully");
      setData({ patientId:"", doctorId:"", date:"", time:"", reason:"" });
      setSelectedDoctor(null);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.form} onSubmit={submitHandler}>
        <h2 style={styles.heading}>Book Appointment</h2>

        {msg && <p style={styles.success}>{msg}</p>}
        {error && <p style={styles.error}>{error}</p>}

        {/* Patient */}
        <select
          required
          style={styles.input}
          value={data.patientId}
          onChange={e => setData({ ...data, patientId: e.target.value })}
        >
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.email})
            </option>
          ))}
        </select>

        {/* Doctor */}
        <select
          required
          style={styles.input}
          value={data.doctorId}
          onChange={e => {
            const doc = doctors.find(d => d._id === e.target.value);
            setSelectedDoctor(doc);
            setData({ ...data, doctorId: e.target.value, date:"", time:"" });
          }}
        >
          <option value="">Select Doctor</option>
          {doctors.map(d => (
            <option key={d._id} value={d._id}>
              {d.userId.name} – {d.specialization}
            </option>
          ))}
        </select>

        {/* Doctor Info */}
        {selectedDoctor && (
          <div style={styles.card}>
            <p><b>Available Days:</b> {selectedDoctor.availableDays.join(", ")}</p>
            <p><b>Consultation Fee:</b> ₹{selectedDoctor.consultationFee}</p>
          </div>
        )}

        {/* Date */}
        <input
          type="date"
          required
          style={styles.input}
          value={data.date}
          onChange={e => {
            if (
              selectedDoctor &&
              !isDayAllowed(e.target.value, selectedDoctor.availableDays)
            ) {
              alert("Doctor not available on this day");
              return;
            }
            setData({ ...data, date: e.target.value });
          }}
        />

        {/* Time */}
        <select
          required
          style={styles.input}
          value={data.time}
          onChange={e => setData({ ...data, time: e.target.value })}
        >
          <option value="">Select Time</option>
          {TIME_SLOTS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Reason */}
        <textarea
          placeholder="Reason for visit"
          style={styles.textarea}
          value={data.reason}
          onChange={e => setData({ ...data, reason: e.target.value })}
        />

        <button style={styles.button}>Book Appointment</button>
      </form>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "85vh",
    background: "#f0fdfa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px"
  },

  form: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  heading: {
    textAlign: "center",
    color: "#0f766e",
    marginBottom: "10px"
  },

  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  textarea: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "none"
  },

  card: {
    background: "#ecfeff",
    border: "1px solid #99f6e4",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px"
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    background: "#0f766e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer"
  },

  success: {
    color: "green",
    textAlign: "center",
    fontSize: "14px"
  },

  error: {
    color: "red",
    textAlign: "center",
    fontSize: "14px"
  }
};

export default ReceptionistBookAppointment;
