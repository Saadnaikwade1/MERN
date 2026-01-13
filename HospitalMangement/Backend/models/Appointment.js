const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",          // ✅ FIXED
      required: true
    },
 
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",          // ✅ FIXED
      required: true 
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },
    reason:String,
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
