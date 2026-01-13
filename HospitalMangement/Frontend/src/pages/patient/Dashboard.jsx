import React from "react";
import { Link } from "react-router-dom";
import PatientNavbar from "../../components/PatientNavbar";

const Dashboard = () => {
  return (
    <>
    

      <div style={styles.container}>
        <h2 style={styles.heading}>Patient Dashboard</h2>

        <div style={styles.cardContainer}>
          <Link to="/patient/profile" style={styles.card}>
            🧾 Create Profile
          </Link>

          <Link to="/patient/prescriptions" style={styles.card}>
            💊 Prescriptions
          </Link>

          <Link to="/patient/bookappt" style={styles.card}>
            📅 Book Appointment
          </Link>
          <Link to="/patient/myappt" style={styles.card}>
           🗓️ My Appointments
          </Link>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f0fdfa",
    minHeight: "100vh"
  },
  heading: {
    marginBottom: "20px",
    color: "#0f766e",
    fontSize: "24px"
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },
  card: {
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#0f766e",
    fontWeight: "600",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.2s"
  }
};

export default Dashboard;
