import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const fetchAppointments = async () => {
    const res = await api.get("/appointments/patient");
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Screen resize detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📅 My Appointments</h2>

      {appointments.length === 0 ? (
        <p style={styles.empty}>No appointments found</p>
      ) : (
        <>
          {/* Desktop Table */}
          {!isMobile && (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Doctor</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Time</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a) => (
                  <tr key={a._id} style={styles.tr}>
                    <td style={styles.td}>{a.doctorId?.name}</td>
                    <td style={styles.td}>{a.date}</td>
                    <td style={styles.td}>{a.time}</td>
                    <td style={styles.td}>
                      <span style={statusStyle(a.status)}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Mobile Cards */}
          {isMobile &&
            appointments.map((a) => (
              <div key={a._id} style={styles.card}>
                <p><strong>Doctor:</strong> {a.doctorId?.name}</p>
                <p><strong>Date:</strong> {a.date}</p>
                <p><strong>Time:</strong> {a.time}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span style={statusStyle(a.status)}>
                    {a.status}
                  </span>
                </p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

// 🔹 Status badge style
const statusStyle = (status) => ({
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
  color: "white",
  backgroundColor:
    status === "approved"
      ? "#16a34a"
      : status === "rejected"
      ? "#dc2626"
      : "#f59e0b"
});

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#f0fdfa"
  },

  heading: {
    marginBottom: "20px",
    color: "#0f766e",
    fontSize: "24px",
    fontWeight: "600"
  },

  empty: {
    color: "#64748b",
    fontSize: "16px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
  },

  th: {
    backgroundColor: "#0f766e",
    color: "white",
    padding: "12px",
    textAlign: "left"
  },

  tr: {
    borderBottom: "1px solid #e5e7eb"
  },

  td: {
    padding: "10px",
    color: "#334155"
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    borderLeft: "5px solid #0f766e"
  }
};

export default MyAppointments;
