import { useState } from "react";
import api from "../../api/axios";
import DoctorNavbar from "../../components/DoctorNavbar";
import { useParams } from "react-router-dom";

const Prescription = () => {
  const { id } = useParams();

  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "" }
  ]);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await api.post(`/doctors/prescriptions/${id}`, {
      diagnosis,
      medicines,
      notes
    });

    setMessage("Prescription created successfully ✅");
  };

  return (
    <>
   

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Create Prescription</h2>

          {message && <p style={styles.success}>{message}</p>}

          <form onSubmit={submitHandler} style={styles.form}>
            {/* Diagnosis */}
            <label style={styles.label}>Diagnosis</label>
            <textarea
              style={styles.textarea}
              placeholder="Enter diagnosis details"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />

            {/* Medicines */}
            <h4 style={styles.subHeading}>Medicines</h4>

            {medicines.map((m, i) => (
              <div key={i} style={styles.medicineRow}>
                <input
                  style={styles.input}
                  placeholder="Medicine Name"
                  value={m.name}
                  onChange={(e) =>
                    handleMedicineChange(i, "name", e.target.value)
                  }
                  required
                />
                <input
                  style={styles.input}
                  placeholder="Dosage"
                  value={m.dosage}
                  onChange={(e) =>
                    handleMedicineChange(i, "dosage", e.target.value)
                  }
                  required
                />
                <input
                  style={styles.input}
                  placeholder="Duration"
                  value={m.duration}
                  onChange={(e) =>
                    handleMedicineChange(i, "duration", e.target.value)
                  }
                  required
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addMedicine}
              style={styles.addBtn}
            >
              + Add Medicine
            </button>

            {/* Notes */}
            <label style={styles.label}>Additional Notes</label>
            <textarea
              style={styles.textarea}
              placeholder="Optional notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {/* Submit */}
            <button type="submit" style={styles.submitBtn}>
              Save Prescription
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ecfeff, #f0fdfa)",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },

  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "800px",
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

  success: {
    color: "#16a34a",
    marginBottom: "15px",
    fontWeight: "500",
    textAlign: "center"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  label: {
    fontWeight: "600",
    color: "#334155"
  },

  subHeading: {
    marginTop: "10px",
    color: "#0f766e"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5f5",
    fontSize: "14px",
    flex: 1
  },

  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5f5",
    fontSize: "14px",
    minHeight: "80px",
    resize: "vertical"
  },

  medicineRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  addBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500"
  },

  submitBtn: {
    marginTop: "10px",
    backgroundColor: "#0f766e",
    color: "#ffffff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default Prescription;
