const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    bloodGroup: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
