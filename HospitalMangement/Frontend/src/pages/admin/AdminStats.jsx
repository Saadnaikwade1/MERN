import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminNavbar from "../../components/AdminNavbar";

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    api.get("/admin/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!stats) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loading}>Loading statistics...</p>
      </div>
    );
  }

  return (
    <>

      <div
        style={{
          ...styles.container,
          padding: isMobile ? "16px" : "30px"
        }}
      >
        <h2
          style={{
            ...styles.heading,
            fontSize: isMobile ? "20px" : "26px",
            textAlign: isMobile ? "center" : "left"
          }}
        >
          Admin Statistics
        </h2>

        <div style={styles.grid}>
          <StatCard title="Total Users" value={stats.totalUsers} />
          <StatCard title="Total Doctors" value={stats.doctors} />
          <StatCard title="Approved Doctors" value={stats.approvedDoctors} />
          <StatCard title="Pending Doctors" value={stats.pendingDoctors} />
          <StatCard title="Doctor Profiles Created" value={stats.doctorProfiles} />
          <StatCard title="Patients" value={stats.patients} />
          <StatCard title="Receptionists" value={stats.receptionists} />
        </div>
      </div>
    </>
  );
};

const StatCard = ({ title, value }) => (
  <div style={styles.card}>
    <p style={styles.cardTitle}>{title}</p>
    <h3 style={styles.cardValue}>{value}</h3>
  </div>
);

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0fdfa"
  },

  heading: {
    marginBottom: "25px",
    color: "#0f766e",
    fontWeight: "600"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px"
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    borderLeft: "6px solid #0f766e",
    transition: "transform 0.25s ease, box-shadow 0.25s ease"
  },

  cardTitle: {
    margin: 0,
    fontSize: "13px",
    color: "#555",
    fontWeight: "500"
  },

  cardValue: {
    margin: "8px 0 0",
    fontSize: "26px",
    color: "#0f766e",
    fontWeight: "700"
  },

  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0fdfa",
    padding: "20px",
    textAlign: "center"
  },

  loading: {
    fontSize: "18px",
    color: "#0f766e",
    fontWeight: "500"
  }
};

export default AdminStats;
