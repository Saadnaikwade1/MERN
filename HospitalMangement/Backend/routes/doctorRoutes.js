const express = require("express");
const {
  createDoctor,
  getDoctors,
  getDoctorById,
  getMyProfile,
  getApprovedDoctors

} = require("../controllers/doctorController");

const { protect, adminOnly, doctorOnly } = require("../middleware/authMiddleware");
const { getAppointments, updateAppointmentStatus } = require("../controllers/appointmentController");
const { createPrescription } = require("../controllers/prescriptionController");

const router = express.Router();

/* Admin creates doctor profile */
router.post("/", protect, adminOnly, createDoctor);



//doctor associated
router.get("/me", protect, doctorOnly, getMyProfile);
router.get("/appointments/:id",getAppointments)
router.put("/appointments/:id",updateAppointmentStatus)
router.post('/prescriptions/:id',protect,createPrescription)
router.get("/", getApprovedDoctors);

/* Public / authenticated */
router.get("/", protect, getDoctors);
router.get("/:id", protect, getDoctorById);
module.exports = router;
