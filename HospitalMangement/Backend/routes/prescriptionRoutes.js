const express = require("express");
const {
  createPrescription,
  getPrescriptionsByPatient,
  getPrescriptionsByDoctor
} = require("../controllers/prescriptionController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* Doctor creates prescription */
router.post("/", protect, createPrescription);

/* Patient views prescriptions */
router.get("/patient/:patientId", protect, getPrescriptionsByPatient);

/* Doctor views own prescriptions */
router.get("/doctor/:doctorId", protect, getPrescriptionsByDoctor);

module.exports = router;
