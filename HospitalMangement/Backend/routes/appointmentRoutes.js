const express = require("express");
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  bookAppointment,
  getPatientAppointments,
  getAllAppointments,
  updateStatus,
  createAppointmentRec,
  getAppointmentsByPatient
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/me", protect, bookAppointment);
// router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);
router.get("/patient", protect, getPatientAppointments);
router.put("/:id", protect, updateAppointmentStatus);

// reception
router.post("/book", createAppointmentRec);

router.get("/get", getAllAppointments);
router.put(":id/status", updateStatus);
router.get("/patient/:id",getAppointmentsByPatient)

module.exports = router;
    