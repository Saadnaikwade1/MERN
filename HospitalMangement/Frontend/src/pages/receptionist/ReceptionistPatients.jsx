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
    <div style={styles.container}>
      <h2 style={styles.heading}>Search Patient</h2>

      <input
        style={styles.input}
        placeholder="Search by name or email"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {/* Search results */}
      {patients.map(p => (
        <div
          key={p._id}
          style={styles.result}
          onClick={() => selectPatient(p)}
        >
          {p.name} — {p.email}
        </div>
      ))}

      {/* Appointment History */}
      {selectedPatient && (
        <div style={styles.card}>
          <h3>{selectedPatient.name}'s Appointments</h3>

          {appointments.length === 0 ? (
            <p style={{ color: "green" }}>No previous appointments</p>
          ) : (
            appointments.map(a => (
              <div key={a._id} style={styles.appt}>
                <b>Doctor:</b> {a.doctorId?.name} <br />
                <b>Date:</b> {a.date} | {a.time} <br />
                <b>Status:</b> {a.status}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: 24, background: "#f0fdfa", minHeight: "100vh" },
  heading: { color: "#0f766e", marginBottom: 16 },
  input: { padding: 12, width: "100%", marginBottom: 12 },
  result: {
    padding: 10,
    background: "#fff",
    marginBottom: 6,
    cursor: "pointer",
    borderRadius: 6
  },
  card: {
    marginTop: 20,
    background: "#ffffff",
    padding: 16,
    borderRadius: 10
  },
  appt: {
    padding: 10,
    borderBottom: "1px solid #eee"
  }
};

export default ReceptionistPatientSearch;
