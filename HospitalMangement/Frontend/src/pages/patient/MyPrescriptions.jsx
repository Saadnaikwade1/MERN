import { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";

import api from "../../api/axios";
import PatientNavbar from "../../components/PatientNavbar";
import { AuthContext } from "../../context/AuthContext";

const PatientPrescriptions = () => {
  const { user } = useContext(AuthContext);
  const [prescriptions, setPrescriptions] = useState([]);

  const downloadPrescription = (p) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  const margin = 40;
  let y = 50;

  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Medical Prescription", 210, y, { align: "center" });

  y += 30;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  // Doctor & Patient info
  doc.text(`Doctor: ${p.doctorId?.name || "N/A"}`, margin, y);
  y += 20;
  doc.text(`Patient: ${user.name}`, margin, y);
  y += 20;
  doc.text(`Diagnosis: ${p.diagnosis || "N/A"}`, margin, y);
  y += 25;

  // Separator line
  doc.setLineWidth(0.5);
  doc.line(margin, y, 555, y);
  y += 20;

  // Medicines Table Header
  doc.setFont("helvetica", "bold");
  doc.text("No", margin, y);
  doc.text("Medicine", margin + 30, y);
  doc.text("Dose/Day", margin + 200, y);
  doc.text("Duration", margin + 300, y);
  y += 10;
  doc.setLineWidth(0.3);
  doc.line(margin, y, 555, y);
  y += 15;

  doc.setFont("helvetica", "normal");
  p.medicines.forEach((m, index) => {
    doc.text(`${index + 1}`, margin, y);
    doc.text(`${m.name}`, margin + 30, y);
    doc.text(`${m.dosage}`, margin + 200, y);
    doc.text(`${m.duration}`, margin + 300, y);
    y += 20;
  });

  y += 10;

  // Notes
  if (p.notes) {
    doc.setFont("helvetica", "bold");
    doc.text("Notes:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${p.notes}`, margin + 40, y);
    y += 20;
  }

  // Prescribed date
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    `Prescribed on: ${new Date(p.createdAt).toLocaleDateString()}`,
    margin,
    y + 20
  );

  doc.save(`Prescription-${p._id}.pdf`);
};


  useEffect(() => {
    api.get(`prescriptions/patient/${user._id}`).then((res) => {
      setPrescriptions(res.data);
    });
  }, [user._id]);

  return (
    <>
    

      <div style={styles.container}>
        <h2 style={styles.heading}>My Prescriptions</h2>

        {prescriptions.length === 0 && (
          <p style={styles.noData}>No prescriptions found</p>
        )}

        {prescriptions.map((p) => (
          <div key={p._id} style={styles.card}>
            <p>
              <strong>Doctor:</strong> {p.doctorId?.name || "N/A"}
            </p>
            <p>
              <strong>Patient name:</strong> {user.name}
            </p>
            <p>
              <strong>Diagnosis:</strong> {p.diagnosis}
            </p>

            <h4>Medicines</h4>
            <ul style={styles.medicineList}>
              {p.medicines.map((m, i) => (
                <li key={i}>
                  <strong>Tab: {m.name}</strong> — Dose: {m.dosage} /Day — Duration ({m.duration})
                </li>
              ))}
            </ul>

            {p.notes && (
              <p>
                <strong>Notes:</strong> {p.notes}
              </p>
            )}

            <p style={styles.date}>
              Prescribed on: {new Date(p.createdAt).toLocaleDateString()}
            </p>

            <button
              style={styles.button}
              onClick={() => downloadPrescription(p)}
            >
              Download Prescription
            </button>
          </div>
        ))}
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
    color: "#0f766e",
    marginBottom: "25px",
    fontSize: "24px"
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },
  medicineList: {
    listStyleType: "decimal",
    paddingLeft: "20px",
    marginBottom: "10px"
  },
  date: {
    fontSize: "12px",
    color: "#666",
    marginTop: "10px"
  },
  button: {
    marginTop: "15px",
    padding: "8px 16px",
    backgroundColor: "#0f766e",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500"
  },
  noData: {
    color: "#666",
    fontStyle: "italic"
  }
};

export default PatientPrescriptions;
