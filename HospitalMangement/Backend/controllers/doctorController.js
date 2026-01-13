const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

/* ===================== CREATE DOCTOR PROFILE (ADMIN) ===================== */
exports.createDoctor = async (req, res) => {
  try {
    const { userId, specialization, experience, availableDays, consultationFee } =
      req.body;

    const doctor = await Doctor.create({
      userId,
      specialization,
      experience,
      availableDays,
      consultationFee
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===================== GET ALL DOCTORS ===================== */
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name email");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* ===================== GET SINGLE DOCTOR ===================== */
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    res.json(doctor); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//=====get profiles

exports.getMyProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id })
      .populate("userId", "name email");

    if (!doctor) {
      return res.status(404).json({ message: "Profile not created yet" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//===================== CREATE PRESCRIPTION
exports.createPrescription = async (req, res) => {
  try {
    const { appointmentId, diagnosis, medicines, notes } = req.body;

    // 1️⃣ Get doctor profile
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // 2️⃣ Get appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // 3️⃣ Ensure appointment belongs to doctor
    if (appointment.doctor.toString() !== doctor._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // 4️⃣ Prevent duplicate prescription
    const exists = await Prescription.findOne({ appointment: appointmentId });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Prescription already created" });
    }

    // 5️⃣ Create prescription
    const prescription = await Prescription.create({
      appointment: appointmentId,
      doctor: doctor._id,
      patient: appointment.patient,
      diagnosis,
      medicines,
      notes
    }); 

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//============get approved doctors
exports.getApprovedDoctors = async (req, res) => {
  try {
    // fetch doctors that are approved
    const doctors = await Doctor.find({})  // you can filter isApproved if needed
      .populate("userId", "name email")    // populate name from User
      .sort({ createdAt: -1 });

    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Server error" });
  }
};