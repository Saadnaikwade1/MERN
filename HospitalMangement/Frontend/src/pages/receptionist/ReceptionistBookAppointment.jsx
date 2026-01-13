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
    setMsg(""); setError("");

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
    <div style={styles.container}>
      <h2 style={styles.heading}>Book Appointment</h2>

      {msg && <p style={styles.success}>{msg}</p>}
      {error && <p style={styles.error}>{error}</p>}

      <form style={styles.form} onSubmit={submitHandler}>
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
            <p><b>Available:</b> {selectedDoctor.availableDays.join(", ")}</p>
            <p><b>Fee:</b> ₹{selectedDoctor.consultationFee}</p>
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

        <textarea
          placeholder="Reason"
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
  container:{ padding:30, background:"#f0fdfa", minHeight:"100vh" },
  heading:{ color:"#0f766e", marginBottom:20 },
  form:{ maxWidth:420, background:"#fff", padding:24, borderRadius:12 },
  input:{ padding:12, width:"100%", marginBottom:12 },
  textarea:{ padding:12, width:"100%", marginBottom:12 },
  card:{ background:"#ecfeff", padding:10, marginBottom:10 },
  button:{ background:"#0f766e", color:"#fff", padding:12 },
  success:{ color:"green" },
  error:{ color:"red" }
};

export default ReceptionistBookAppointment;
