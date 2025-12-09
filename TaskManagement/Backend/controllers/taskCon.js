const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const task = require("../models/taskModel");
const nodemailer = require("nodemailer");

// CREATE ACCOUNT
let add = async (req, res) => {
  try {
    let obj = await task.findById(req.body._id);
    if (obj) {
      return res.json({ msg: "Account already exists with this email ⚠️" });
    }

    let hashcode = await bcrypt.hash(req.body.pwd, 10);
    let data = new task({ ...req.body, pwd: hashcode });
    await data.save();

    res.json({ msg: "Account created" });
  } catch (err) {
    res.json({ msg: "Error in creating account ⚠️" });
  }
};

// LOGIN
let login = async (req, res) => {
  try {
    let obj = await task.findById(req.body._id);
    if (!obj) return res.json({ msg: "Check your email" });

    let f = await bcrypt.compare(req.body.pwd, obj.pwd);
    if (!f) return res.json({ msg: "Incorrect password ⚠️" });

    res.json({
      token: jwt.sign({ _id: obj._id }, "abcd"),
      role: obj.role,
      name: obj.name,
    });
  } catch {
    res.json({ msg: "Error in login ⚠️" });
  }
};

// EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "naikwadesaad@gmail.com",
    pass: "qqxrlzhvlotcaukm",
  },
});

// SEND OTP
let sendOtp = async (req, res) => {
  try {
    let obj = await task.findById(req.params.id);

    if (!obj) return res.json({ msg: "Check Email ⚠️" });

    // Generate OTP
    let num = Math.floor(Math.random() * 100000) + "";
    let otp = num.padEnd(5, "0");

    // Save OTP
    await task.findByIdAndUpdate(obj._id, { otp: otp });

    // SEND EMAIL
    let info = await transporter.sendMail({
      from: '"Task Manager Portal" <naikwadesaad@gmail.com>',
      to: obj._id,
      subject: "Password Reset",
      html: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f6;padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="padding:22px 28px;background:#2563eb;color:#ffffff;">
            <h2 style="margin:0;font-size:22px;font-weight:700;">Task Manager Portal</h2>
            <p style="margin:4px 0 0;font-size:14px;opacity:0.9;">Password Reset Request</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px;">
            <p style="margin:0 0 16px;font-size:15px;color:#1f2937;">
              Hello, ${obj.name}
            </p>

            <p style="margin:0 0 22px;font-size:15px;color:#374151;line-height:1.5;">
              A request was received to reset the password for your Task Manager account.
              Use the below OTP to continue. This OTP is valid for <strong>10 minutes</strong>.
            </p>

            <!-- OTP Box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
              <tr>
                <td align="center">
                  <div style="padding:16px 26px;background:#f8fafc;border:1px dashed #2563eb;border-radius:8px;display:inline-block;">
                    <span style="font-size:26px;font-weight:700;letter-spacing:4px;color:#1e3a8a;">${otp}</span>
                  </div>
                </td>
              </tr>
            </table>

            <p style="margin:16px 0 0;font-size:13px;color:#6b7280;">
              If you did not request this, please ignore this email. Your account is safe.
            </p>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:26px 0;">

            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
              Need help? Contact us at 
              <a style="color:#2563eb;text-decoration:none;" href="mailto:naikwadesaad@gmail.com">
                naikwadesaad@gmail.com
              </a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:18px;background:#f3f4f6;text-align:center;font-size:12px;color:#9ca3af;">
            © 2025 Task Manager Portal. All rights reserved.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`
    });

    if (info.accepted.length !== 0) {
      res.json({ msg: "OTP sent" });
    } else {
      res.json({ msg: "Error in sending OTP ⚠️" });
    }
  } catch (err) {
    res.json({ msg: "Error in sending OTP ⚠️" });
  }
};

let validateOtp=async(req,res)=>{
    try{
   
      let obj=await task.findById(req.params.id)
      if(obj?.otp==req.params.otp){
        await  task.findByIdAndUpdate({"_id":obj._id},{$unset:{"otp":""}})
        res.json({"msg":"OTP Verified"})

      }else{
        res.json({"msg":"Provide valid OTP"})
      }
     

    }catch(err){
      console.log(err.message);
      
      res.json({"msg":"Error verifying OTP"})
    }
}

let updatePassword=async(req,res)=>{
  try {
    let hash= await bcrypt.hash(req.body.pwd,10)
    await task.findByIdAndUpdate({"_id":req.body._id},{"pwd":hash})
    res.json({"msg":"Password Updated succesfully."})
  } catch {
    res.json({"msg":"Error in reseting password"})
  }
}
module.exports = { add, login, sendOtp,validateOtp,updatePassword};
 