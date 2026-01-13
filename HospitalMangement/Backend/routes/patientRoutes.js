const express = require("express");
const {
  createPatient,
  getPatients, 
  getPatientById,
  getMyPrescriptions,
  getMyProfile,
  searchPatients
} = require("../controllers/patientController");

const { protect, adminOnly, patientOnly } = require("../middleware/authMiddleware");

const router = express.Router();
 


router.get("/me/prescriptions", protect, patientOnly, getMyPrescriptions);
router.get("/profile", protect, getMyProfile);

router.post("/profile", protect, createPatient);

router.get("/", protect, getPatients);
// router.get("/:id", protect, getPatientById);

router.get("/search", searchPatients);

module.exports = router;
 