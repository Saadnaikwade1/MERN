import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user } = useContext(AuthContext);

  const fetchAppointments = async () => {
    if (!user?._id) return;
    const res = await api.get(`/doctors/appointments/${user._id}`);
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/doctors/appointments/${id}`, { status });
    fetchAppointments();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Appointments</h2>

      {/* DESKTOP TABLE */}
      {!isMobile && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} style={styles.row}>
                  <td>
                    <div style={styles.patientCell}>
                      <div style={styles.avatar}>
                        {a.patientId?.name?.charAt(0)}
                      </div>
                      {a.patientId?.name}
                    </div>
                  </td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>
                    <span style={statusStyle(a.status)}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <Actions a={a} updateStatus={updateStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MOBILE CARDS */}
      {isMobile && (
        <div style={styles.cards}>
          {appointments.map((a) => (
            <div key={a._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.patientCell}>
                  <div style={styles.avatar}>
                    {a.patientId?.name?.charAt(0)}
                  </div>
                  {a.patientId?.name}
                </div>
                <span style={statusStyle(a.status)}>
                  {a.status}
                </span>
              </div>

              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Time:</strong> {a.time}</p>

              <div style={{ marginTop: "10px" }}>
                <Actions a={a} updateStatus={updateStatus} />
              </div>
            </div>
          ))}
        </div>
      )}

      {appointments.length === 0 && (
        <p style={styles.empty}>No appointments found</p>
      )}
    </div>
  );
};

const Actions = ({ a, updateStatus }) => (
  <div style={styles.actions}>
    {a.status === "pending" && (
      <>
        <button
          style={styles.acceptBtn}
          onClick={() => updateStatus(a._id, "confirmed")}
        >
          Accept
        </button>
        <button
          style={styles.rejectBtn}
          onClick={() => updateStatus(a._id, "rejected")}
        >
          Reject
        </button>
      </>
    )}

    {a.status === "confirmed" && (
      <>
        <button
          style={styles.completeBtn}
          onClick={() => updateStatus(a._id, "completed")}
        >
          Complete
        </button>
        <Link
          style={styles.link}
          to={`/doctor/prescriptions/${a._id}`}
        >
          Prescription
        </Link>
      </>
    )}
  </div>
);

const statusStyle = (status) => ({
  ...styles.status,
  backgroundColor:
    status === "pending"
      ? "#facc15"
      : status === "confirmed"
      ? "#22c55e"
      : status === "rejected"
      ? "#ef4444"
      : "#3b82f6"
});

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ecfeff, #f0fdfa)"
  },
  heading: {
    marginBottom: "20px",
    color: "#0f766e",
    fontSize: "26px",
    fontWeight: "700"
  },
  tableWrapper: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 12px"
  },
  headerRow: {
    backgroundColor: "#0f766e",
    color: "#fff"
  },
  row: {
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },
  patientCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600"
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#0f766e",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  status: {
    padding: "6px 14px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "12px",
    textTransform: "capitalize"
  },
  actions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  acceptBtn: {
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px"
  },
  rejectBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px"
  },
  completeBtn: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px"
  },
  link: {
    padding: "6px 12px",
    backgroundColor: "#e0f2fe",
    borderRadius: "6px",
    textDecoration: "none",
    color: "#0369a1"
  },
  empty: {
    textAlign: "center",
    marginTop: "20px",
    color: "#64748b"
  }
};

export default DoctorAppointments;
