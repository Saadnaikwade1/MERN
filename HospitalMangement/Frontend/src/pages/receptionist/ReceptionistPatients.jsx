import { useEffect, useState } from "react";
import api from "../../api/axios";

const ReceptionistPatientSearch = () => {
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (query.length < 2) {
      setPatients([]);
      return;
    }

    const delay = setTimeout(() => {
      api
        .get(`/patients/search?query=${query}`)
        .then(res => setPatients(res.data));
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const selectPatient = async (p) => {
    setSelectedPatient(p);
    const res = await api.get(`/appointments/patient/${p._id}`);
    setAppointments(res.data);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Patient Search</h2>

        {/* Search Input */}
        <input
          style={styles.input}
          placeholder="Search patient by name or email"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        {/* Search Results */}
        {patients.length > 0 && (
          <div style={styles.resultsBox}>
            {patients.map(p => (
              <div
                key={p._id}
                style={{
                  ...styles.result,
                  background:
                    selectedPatient?._id === p._id ? "#ccfbf1" : "#ffffff"
                }}
                onClick={() => selectPatient(p)}
              >
                <strong>{p.name}</strong>
                <span style={styles.email}>{p.email}</span>
              </div>
            ))}
          </div>
        )}

        {/* Appointment History */}
        {selectedPatient && (
          <div style={styles.historyCard}>
            <h3 style={styles.subHeading}>
              {selectedPatient.name}'s Appointment History
            </h3>

            {appointments.length === 0 ? (
              <p style={styles.noAppt}>No previous appointments</p>
            ) : (
              appointments.map(a => (
                <div key={a._id} style={styles.apptCard}>
                  <div><b>Doctor:</b> {a.doctorId?.name}</div>
                  <div><b>Date:</b> {a.date}</div>
                  <div><b>Time:</b> {a.time}</div>
                  <span style={styles.status(a.status)}>
                    {a.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0fdfa",
    display: "flex",
    justifyContent: "center",
    padding: "30px"
  },

  container: {
    width: "100%",
    maxWidth: "700px"
  },

  heading: {
    color: "#0f766e",
    marginBottom: "16px",
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "999px",
    border: "1px solid #d1d5db",
    marginBottom: "14px",
    fontSize: "15px"
  },

  resultsBox: {
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    overflow: "hidden"
  },

  result: {
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column"
  },

  email: {
    fontSize: "13px",
    color: "#6b7280"
  },

  historyCard: {
    marginTop: "24px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
  },

  subHeading: {
    marginBottom: "12px",
    color: "#115e59"
  },

  noAppt: {
    color: "green",
    fontWeight: "500"
  },

  apptCard: {
    padding: "12px",
    borderRadius: "8px",
    background: "#f9fafb",
    marginBottom: "10px",
    position: "relative"
  },

  status: (s) => ({
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    color: "white",
    background:
      s === "confirmed"
        ? "#22c55e"
        : s === "pending"
        ? "#f59e0b"
        : "#ef4444"
  })
};

export default ReceptionistPatientSearch;
