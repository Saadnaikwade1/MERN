import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const TIME_SLOTS = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "17:00",
  "17:30",
  "18:00"
];

const BookAppointment = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [data, setData] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: ""
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/doctors").then((res) => setDoctors(res.data));
  }, []);

  const isDayAllowed = (date, availableDays) => {
    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "short"
    });
    return availableDays.includes(day);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log(data);
      await api.post("/appointments/me", data);
      
      setMsg("Appointment booked successfully");
      setTimeout(() => navigate("/patient"), 1000);
    } catch (err) {
      setError(err.message || "Failed to book appointment");
    }
  };

  return (
    <div style={styles.container}>
      {/* <h2 style={styles.heading}>Book Appointment</h2> */}

      <form style={styles.form} onSubmit={submitHandler}>
        {msg && <p style={styles.success}>{msg}</p>}
        {error && <p style={styles.error}>{error}</p>}

        {/* Doctor Select */}
        <select
          name="doctor"
          value={data.doctor}
          onChange={(e) => {
            const doctorId = e.target.value;
            setData({ ...data, doctor: doctorId });

            const doc = doctors.find(
              (d) => d.userId._id === doctorId
            );
            setSelectedDoctor(doc);
          }}
          required
          style={styles.input}
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d._id} value={d.userId._id}>
              {d.userId.name} — {d.specialization} (₹{d.consultationFee})
            </option>
          ))}
        </select>

        {/* Doctor Info Card */}
        {selectedDoctor && (
          <div style={styles.card}>
            <strong>{selectedDoctor.userId.name}</strong>
            <p>Specialization: {selectedDoctor.specialization}</p>
            <p>Experience: {selectedDoctor.experience} years</p>
            <p>Available Days: {selectedDoctor.availableDays.join(", ")}</p>
          </div>
        )}

        {/* Date */}
        <input
          type="date"
          name="date"
          value={data.date}
          onChange={(e) => {
            if (
              selectedDoctor &&
              !isDayAllowed(e.target.value, selectedDoctor.availableDays)
            ) {
              alert("Doctor not available on this day");
              return;
            }
            setData({ ...data, date: e.target.value });
          }}
          required
          style={styles.input}
        />

        {/* Time */}
        <select
          name="time"
          value={data.time}
          onChange={(e) =>
            setData({ ...data, time: e.target.value })
          }
          required
          style={styles.input}
        >
          <option value="">Select Time</option>
          {TIME_SLOTS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Reason */}
        <textarea
          name="reason"
          placeholder="Reason for visit"
          value={data.reason}
          onChange={(e) =>
            setData({ ...data, reason: e.target.value })
          }
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          Book Appointment
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f0fdfa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    color: "#0f766e",
    marginBottom: 15
  },
  form: {
    width: "90%",
    maxWidth: 420,
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 14
  },
  input: {
    padding: 12,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  textarea: {
    padding: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
    resize: "none"
  },
  card: {
    background: "#ecfeff",
    border: "1px solid #0f766e",
    padding: 12,
    borderRadius: 8
  },
  button: {
    padding: 12,
    backgroundColor: "#0f766e",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontWeight: 600,
    cursor: "pointer"
  },
  success: { color: "green", textAlign: "center" },
  error: { color: "red", textAlign: "center" }
};

export default BookAppointment;
