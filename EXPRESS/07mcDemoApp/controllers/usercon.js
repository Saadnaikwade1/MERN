const um = require("../models/uesrmodel");
const bcrypt = require("bcrypt");

let addUser = async(req, res) => {
  try {
    let obj = await um.findById(req.body._id);
    if (obj) {
      res.json({ msg: "Given email is exists" });
    } else {
      let hashCode = await bcrypt.hash(req.body.pwd, 10);
      let data = new um({ ...req.body, "pwd": hashCode });
      await data.save();
      res.json({ msg: "Account created" });
    }
  } catch(err) {
    res.json({ "msg": "error in reg",});
    console.log(err);
  }
};
let login = async (req, res) => {
  try {
    let obj = await um.findById(req.body._id);
    if (obj) {
      let f = await bcrypt.compare(req.body.pwd, obj.pwd);
      if (f) {
        res.json({ "msg": " login sucess" });
      } else {
        res.json({ "msg": "check pwd" });
      }
    } else {
      res.json({ "msg": "check email" });
    }
  } catch {
    res.json({ "msg": "error in login" });
  }
};

module.exports = { addUser, login };
