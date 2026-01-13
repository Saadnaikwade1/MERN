import { useEffect, useState } from "react";
import api from "../../api/axios";
import DoctorNavbar from "../../components/DoctorNavbar";

const DoctorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/doctors/me")
      .then((res) => setProfile(res.data))
      .catch(() => setError("Profile not created yet"));
  }, []);

  return (
    <>
      

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>My Profile</h2>

          {error && <p style={styles.error}>{error}</p>}

          {profile && (
            <>
              {/* Header */}
              <div style={styles.header}>
                <div style={styles.avatar}>
                  {profile.userId?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 style={styles.name}>{profile.userId?.name}</h3>
                  <p style={styles.email}>{profile.userId?.email}</p>
                </div>
              </div>

              {/* Info Grid */}
              <div style={styles.infoGrid}>
                <Info label="Specialization" value={profile.specialization} />
                <Info
                  label="Experience"
                  value={`${profile.experience} years`}
                />
                <Info
                  label="Consultation Fee"
                  value={`₹ ${profile.consultationFee}`}
                />
                <Info
                  label="Available Days"
                  value={profile.availableDays?.join(", ")}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const Info = ({ label, value }) => (
  <div style={styles.infoCard}>
    <span style={styles.infoLabel}>{label}</span>
    <span style={styles.infoValue}>{value}</span>
  </div>
);

const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg, #ecfeff, #f0fdfa)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },

  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "700px",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },

  heading: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f766e",
    textAlign: "center"
  },

  error: {
    color: "#ef4444",
    textAlign: "center",
    fontWeight: "500"
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap"
  },

  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    backgroundColor: "#0f766e",
    color: "#fff",
    fontSize: "28px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  name: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#0f172a"
  },

  email: {
    fontSize: "14px",
    color: "#475569"
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px"
  },

  infoCard: {
    backgroundColor: "#f8fafc",
    padding: "14px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },

  infoLabel: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "500"
  },

  infoValue: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#0f172a"
  }
};

export default DoctorProfile;
