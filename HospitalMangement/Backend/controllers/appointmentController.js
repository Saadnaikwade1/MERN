const Appointment = require("../models/Appointment");

/* ===================== CREATE APPOINTMENT ===================== */
// exports.createAppointment = async (req, res) => {
//   try {
//     const { patientId, doctorId, date, time } = req.body;

//     const appointment = await Appointment.create({
//       patientId,
//       doctorId,
//       date,
//       time
//     });

//     res.status(201).json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.createAppointmentRec = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;

    // ❌ prevent double booking
    const exists = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: { $ne: "cancelled" }
    });

    if (exists) {
      return res.status(400).json({
        message: "Time slot already booked"
      });
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      time,
      reason
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===================== GET ALL APPOINTMENTS ===================== */
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.id
    }).populate("patientId"); // 🔥 fetch patient automatically

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===================== UPDATE APPOINTMENT STATUS ===================== */
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    appointment.status = req.body.status;
    await appointment.save();

    res.json({ message: "Appointment status updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//=========
exports.bookAppointment = async (req, res) => {
  console.log(req.body);
  try {
    const { doctor, date, time, reason } = req.body;
 
    // ✅ PREVENT DOUBLE BOOKING
    const existing = await Appointment.findOne({
      doctorId: doctor,
      date,
      time,
      status: { $in: ["pending", "accepted"] }
    });

    if (existing) {
      return res.status(400).json({
        message: "This slot is already booked"
      });
    }

    const appointment = await Appointment.create({
      patientId: req.user._id,   // ✅ FROM TOKEN
      doctorId: doctor,          // ✅ FROM SELECT
      date,
      time,
      reason
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getPatientAppointments = async (req, res) => {
  try {
    // only patient can access
    if (req.user.role !== "patient") {
      return res.status(403).json({ message: "Access denied" });
    }

    const appointments = await Appointment.find({
      patientId: req.user._id
    })
      .populate("doctorId", "name email") // show doctor info
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error("Patient appointments error:", error);
    res.status(500).json({ message: error.message });
  }
};



//====get alll appointment for reception\
exports.getAllAppointments = async (req, res) => {
  const appts = await Appointment.find()
    .populate("patientId", "name")
    .populate("doctorId", "name");

  res.json(appts);
};


exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  await Appointment.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "Status updated" });
};
