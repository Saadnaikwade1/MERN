const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");

/* ===================== CREATE PRESCRIPTION (DOCTOR) ===================== */
exports.createPrescription = async (req, res) => {
  console.log("hi this");
  try {
    const { diagnosis, medicines, notes } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const { patientId, doctorId } = appointment;

    const prescription = await Prescription.create({
      patientId,
      doctorId,
      diagnosis,
      medicines,
      notes
    });

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};


/* ===================== GET PRESCRIPTIONS BY PATIENT ===================== */
exports.getPrescriptionsByPatient = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patientId: req.params.patientId
    })
      .populate("doctorId")

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===================== GET PRESCRIPTIONS BY DOCTOR ===================== */
exports.getPrescriptionsByDoctor = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      doctorId: req.params.doctorId
    })
      .populate("doctorId")
      .populate("patientId");

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
