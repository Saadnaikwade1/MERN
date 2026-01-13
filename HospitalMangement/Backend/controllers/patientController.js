const Patient = require("../models/Patient");
const User = require("../models/User");

/* ===================== CREATE PATIENT ===================== */
exports.createPatient = async (req, res) => {
  console.log(req.body);
  try {
    const existing = await Patient.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ message: "Patient profile already exists" });
    }

    const patient = await Patient.create({
      user: req.user._id,
      ...req.body
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===================== GET ALL PATIENTS ===================== */
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===================== GET PATIENT BY ID ===================== */
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//========================
exports.getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patient: req.user._id
    })
      .populate("doctor", "specialization")
      .populate({
        path: "appointment",
        select: "date time"
      })
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =============GET MY PROFILE
exports.getMyProfile = async (req, res) => {
  const profile = await Patient.findOne({ user: req.user._id });
  res.json(profile);
};


exports.searchPatients = async (req, res) => {
  try {
    let { query } = req.query;

    if (!query || !query.trim()) {
      return res.json([]);
    }

    query = query.trim();

    const patients = await User.find({
      role: "patient",
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    }).select("name email");

    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
