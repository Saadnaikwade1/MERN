import { useEffect, useState } from "react";
import api from "../../api/axios";

const ReceptionistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments/get");
      setAppointments(res.data);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/doctors/appointments/${id}`, { status });
      fetchAppointments();
    } catch {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Appointments</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && appointments.length === 0 && (
        <p>No appointments found</p>
      )}

      {/* ===== TABLE VIEW (Desktop / Tablet) ===== */}
      {appointments.length > 0 && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Patient</th>
                <th style={styles.th}>Doctor</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Time</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a, i) => (
                <tr
                  key={a._id}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#f9fafb" : "#ffffff"
                  }}
                >
                  <td style={styles.td}>{a.patientId?.name || "-"}</td>
                  <td style={styles.td}>{a.doctorId?.name || "-"}</td>
                  <td style={styles.td}>{a.date}</td>
                  <td style={styles.td}>{a.time}</td>
                  <td style={styles.td}>
                    <span style={styles.status(a.status)}>
                      {a.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {a.status === "pending" && (
                      <div style={styles.actions}>
                        <button
                          style={styles.confirm}
                          onClick={() =>
                            updateStatus(a._id, "confirmed")
                          }
                        >
                          Confirm
                        </button>
                        <button
                          style={styles.cancel}
                          onClick={() =>
                            updateStatus(a._id, "cancelled")
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== MOBILE CARD VIEW ===== */}
      <div style={styles.mobileOnly}>
        {appointments.map((a) => (
          <div key={a._id} style={styles.card}>
            <p><strong>Patient:</strong> {a.patientId?.name}</p>
            <p><strong>Doctor:</strong> {a.doctorId?.name}</p>
            <p><strong>Date:</strong> {a.date}</p>
            <p><strong>Time:</strong> {a.time}</p>

            <span style={styles.status(a.status)}>
              {a.status}
            </span>

            {a.status === "pending" && (
              <div style={styles.cardActions}>
                <button
                  style={styles.confirm}
                  onClick={() => updateStatus(a._id, "confirmed")}
                >
                  Confirm
                </button>
                <button
                  style={styles.cancel}
                  onClick={() => updateStatus(a._id, "cancelled")}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "28px",
    minHeight: "100vh",
    background: "#f8fafc"
  },

  heading: {
    marginBottom: "18px",
    color: "#0f172a",
    fontSize: "22px",
    fontWeight: "600"
  },

  error: {
    color: "#dc2626"
  },

  tableWrapper: {
    overflowX: "auto",
    borderRadius: "10px",
    background: "#ffffff",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "720px"
  },

  th: {
    padding: "14px 16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    background: "#f1f5f9",
    color: "#334155"
  },

  td: {
    padding: "14px 16px",
    fontSize: "14px",
    color: "#334155",
    borderBottom: "1px solid #e5e7eb"
  },

  actions: {
    display: "flex",
    gap: "8px"
  },

  confirm: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer"
  },

  cancel: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer"
  },

  status: (s) => ({
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "capitalize",
    color:
      s === "confirmed"
        ? "#166534"
        : s === "pending"
        ? "#92400e"
        : "#7f1d1d",
    background:
      s === "confirmed"
        ? "#dcfce7"
        : s === "pending"
        ? "#fef3c7"
        : "#fee2e2"
  }),

  /* Mobile Cards */
  mobileOnly: {
    display: "none"
  },

  card: {
    background: "#ffffff",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  cardActions: {
    marginTop: "10px",
    display: "flex",
    gap: "10px"
  }
};

export default ReceptionistAppointments;
