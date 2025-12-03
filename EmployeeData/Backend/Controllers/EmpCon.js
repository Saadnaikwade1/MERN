const emp = require("../Models/EmpMod");

let add = async (req, res) => {
  try {
    let data = new emp(req.body);
    await data.save();
    res.json({ msg: "data stored succesfully" });
  } catch {
    res.json({ msg: "Error in storing data" });
  }
};

let disp = async (req, res) => {
  try {
    let data = await emp.find();
    res.json(data);
  } catch {
    res.json({ msg: "Error in getting informatin" });
  }
};
let edit = async (req, res) => {
  try {
    let data = await emp.findById(req.params.id);
    await res.json(data);
  } catch {
    res.json({ msg: "Error in getting data" });
  }
};
let upd=async(req,res)=>{
  try{
    await emp.findByIdAndUpdate(req.body._id, req.body)
    res.json({"msg":"Employee data updated"})
  }catch{
    res.json({"msg":"Error data updation"})

  }
}
let del = async (req, res) => {
  try {
    const id = req.params.id;
    await emp.findByIdAndDelete(id);
    res.json({ msg: `Employee record deleted ID: ${id}` });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ msg: "Error in deleting data" });
  }
};

module.exports = { add, disp, del,edit,upd};
