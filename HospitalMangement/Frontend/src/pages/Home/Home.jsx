import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

/* ---------------- CONSTANTS ---------------- */

const DUMMY_DOCTOR_IMG =
  "https://cdn-icons-png.flaticon.com/512/3774/3774299.png";

const services = [
  { title: "24/7 Emergency", desc: "Immediate care with advanced equipment" },
  { title: "Cardiology", desc: "Heart specialists with modern diagnostics" },
  { title: "Orthopedics", desc: "Bone & joint treatment by experts" },
  { title: "Diagnostics", desc: "MRI, CT Scan, X-Ray & Lab services" }
];

const hospitalImages = [
  "http://ww1.prweb.com/prfiles/2014/12/09/12384315/Okayama_Red_Cross_Hospital%20-%20Free%20Usage.jpg",
  "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg",
  "http://zmchdahod.org/admin/assets/upload/gallery/45.jpg",
  "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI1LTA0L3NyLWltYWdlLTAyMDQyMDI1LXdzMTEtcy00MDZfMS5qcGc.jpg"
];

/* ---------------- COMPONENT ---------------- */

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [hoveredDoctor, setHoveredDoctor] = useState(null);

  /* Fetch doctors */
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  /* Carousel auto slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === hospitalImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to CarePlus Hospital</h1>
        <p style={styles.heroText}>
          Trusted healthcare with experienced doctors and modern facilities.
        </p>

        <div style={styles.heroButtons}>
          <Link to="/login" style={styles.btnPrimary}>Login</Link>
          <Link to="/register" style={styles.btnSecondary}>Register</Link>
        </div>

        <p style={styles.heroNote}>
          👉 To book appointment please login/register <br />
          👉 Emergency patients visit hospital directly
        </p>
      </section>

      {/* SERVICES */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.grid}>
          {services.map((s, i) => (
            <div key={i} style={styles.card}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTORS */}
      <section style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>Our Expert Doctors</h2>

        <div style={styles.grid}>
          {loading
            ? [...Array(6)].map((_, i) => (
                <div key={i} style={styles.skeletonCard}>
                  <div style={styles.skeletonImg}></div>
                  <div style={styles.skeletonLine}></div>
                  <div style={styles.skeletonLineSmall}></div>
                </div>
              ))
            : doctors.map((d) => (
                <div
                  key={d._id}
                  style={
                    hoveredDoctor === d._id
                      ? { ...styles.doctorCard, ...styles.doctorCardHover }
                      : styles.doctorCard
                  }
                  onMouseEnter={() => setHoveredDoctor(d._id)}
                  onMouseLeave={() => setHoveredDoctor(null)}
                >
                  <img
                    src={d.img?.trim() ? d.img : DUMMY_DOCTOR_IMG}
                    alt="Doctor"
                    style={styles.doctorImg}
                    onError={(e) => (e.target.src = DUMMY_DOCTOR_IMG)}
                  />

                  <h3>{d.userId?.name || "Doctor"}</h3>
                  <p>{d.specialization || "Specialist"}</p>
                  <p style={styles.exp}>{d.experience} years experience</p>

                  {/* ✅ FIXED BUTTON */}
                  <button
                    type="button"
                    style={styles.bookBtn}
                    onClick={(e) => {
                      e.stopPropagation(); // ⭐ FIX
                      setSelectedDoctor(d);
                      setShowPopup(true);
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
        </div>
      </section>

      {/* POPUP */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Book Appointment</h3>
            <p><b>Doctor:</b> {selectedDoctor?.userId?.name}</p>

            <input type="date" style={styles.input} />
            <input type="time" style={styles.input} />

            <div style={styles.popupBtns}>
              <button
                style={styles.btnPrimary}
                onClick={() => alert("Login required")}
              >
                Confirm
              </button>
              <button
                style={styles.btnSecondary}
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HOSPITAL CAROUSEL */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Hospital</h2>

        <div style={styles.carousel}>
          <button
            style={styles.navBtn}
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0
                  ? hospitalImages.length - 1
                  : currentSlide - 1
              )
            }
          >
            ❮
          </button>

          <img
            src={hospitalImages[currentSlide]}
            alt="Hospital"
            style={styles.carouselImg}
          />

          <button
            style={styles.navBtn}
            onClick={() =>
              setCurrentSlide(
                currentSlide === hospitalImages.length - 1
                  ? 0
                  : currentSlide + 1
              )
            }
          >
            ❯
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>📍 CarePlus Hospital, Pune</p>
        <p>📞 Emergency: +91 98765 43210</p>
        <p>© 2026 CarePlus Hospital</p>
      </footer>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const styles = {
  container: { fontFamily: "Arial", color: "#064e3b" },

  hero: { padding: "60px 20px", textAlign: "center", background: "#ecfeff" },
  heroTitle: { fontSize: "36px" },
  heroText: { fontSize: "18px", marginBottom: "20px" },

  heroButtons: { display: "flex", justifyContent: "center", gap: "15px" },

  btnPrimary: {
    padding: "10px 18px",
    background: "#0f766e",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none"
  },

  btnSecondary: {
    padding: "10px 18px",
    border: "2px solid #0f766e",
    color: "#0f766e",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none"
  },

  heroNote: { fontSize: "14px", marginTop: "15px" },

  section: { padding: "40px 20px", textAlign: "center" },
  sectionAlt: { padding: "40px 20px", background: "#f0fdfa" },

  sectionTitle: { fontSize: "28px", marginBottom: "25px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.1)"
  },

  doctorCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.1)"
  },

  doctorCardHover: {
    transform: "translateY(-8px)"
  },

  doctorImg: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px"
  },

  exp: { fontSize: "13px", color: "#047857" },

  bookBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#0f766e",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer"
  },

  skeletonCard: { background: "#fff", padding: "15px", borderRadius: "10px" },
  skeletonImg: { height: "180px", background: "#e5e7eb", borderRadius: "8px" },
  skeletonLine: { height: "14px", background: "#e5e7eb", margin: "10px 0" },
  skeletonLineSmall: { height: "10px", background: "#e5e7eb", width: "60%" },

  popupOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  popup: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "300px"
  },

  input: { width: "100%", padding: "8px", marginBottom: "10px" },

  popupBtns: { display: "flex", justifyContent: "space-between" },

  carousel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    margin: "0 auto"
  },

  carouselImg: {
    width: "70%",
    maxWidth: "900px",
    height: "320px",
    objectFit: "cover",
    borderRadius: "12px"
  },

  navBtn: {
    background: "#0f766e",
    color: "#fff",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    fontSize: "20px"
  },

  footer: {
    background: "#0f766e",
    color: "#fff",
    textAlign: "center",
    padding: "20px"
  }
};

export default Home;
