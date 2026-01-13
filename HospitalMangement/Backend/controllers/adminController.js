const Doctor = require("../models/Doctor");
const User = require("../models/User");

/* ===================== GET PENDING USERS ===================== */
exports.getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["doctor", "receptionist"] },
      isApproved: false
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===================== APPROVE USER ===================== */
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.isApproved = true;
    await user.save();

    res.json({
      message: `${user.role} approved successfully`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//===========get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//=====count doc

exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const doctors = await User.countDocuments({ role: "doctor" });
    const patients = await User.countDocuments({ role: "patient" });
    const receptionists = await User.countDocuments({ role: "receptionist" });

    const approvedDoctors = await User.countDocuments({
      role: "doctor",
      isApproved: true
    });

    const pendingDoctors = await User.countDocuments({
      role: "doctor",
      isApproved: false
    });

    const doctorProfiles = await Doctor.countDocuments();

    res.json({
      totalUsers,
      doctors,
      patients,
      receptionists,
      approvedDoctors,
      pendingDoctors,
      doctorProfiles
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============== CREATE DOCTOR
exports.getApprovedDoctors = async (req, res) => {
  try {
    // 1️⃣ Approved doctor users
    const users = await User.find({
      role: "doctor",
      isApproved: true
    }).select("_id name email");

    // 2️⃣ Doctor profiles (get userId only)
    const doctorProfiles = await Doctor.find().select("userId");

    // 3️⃣ Convert existing doctor userIds to string array
    const usedUserIds = doctorProfiles.map(
      (doc) => doc.userId.toString()
    );

    // 4️⃣ Filter users WITHOUT profile
    const filteredUsers = users.filter(
      (user) => !usedUserIds.includes(user._id.toString())
    );
 
    // 5️⃣ Send response
    res.json(filteredUsers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};