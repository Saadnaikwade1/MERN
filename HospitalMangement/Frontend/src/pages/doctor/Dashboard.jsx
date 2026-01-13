import { Link } from "react-router-dom";
import DoctorNavbar from "../../components/DoctorNavbar";

const DoctorDashboard = () => {
  return (
    <>

      <div style={styles.container}>
        <h2 style={styles.heading}>Doctor Dashboard</h2>

        <div style={styles.cardGrid}>
          {/* Profile Card */}
          <Link to="/doctor/profile" style={styles.card}>
            <div style={styles.icon}>👨‍⚕️</div>
            <h3 style={styles.cardTitle}>My Profile</h3>
            <p style={styles.cardText}>
              View and update your personal information
            </p>
          </Link>

          {/* Appointments Card */}
          <Link to="/doctor/appointments" style={styles.card}>
            <div style={styles.icon}>📅</div>
            <h3 style={styles.cardTitle}>Appointments</h3>
            <p style={styles.cardText}>
              Manage patient appointments and prescriptions
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "30px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ecfeff, #f0fdfa)"
  },

  heading: {
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f766e"
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    textDecoration: "none",
    color: "#0f172a",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s"
  },

  icon: {
    fontSize: "36px",
    marginBottom: "15px"
  },

  cardTitle: {
    marginBottom: "8px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#0f766e"
  },

  cardText: {
    fontSize: "14px",
    color: "#475569"
  }
};

export default DoctorDashboard;
