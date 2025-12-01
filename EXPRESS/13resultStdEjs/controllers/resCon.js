const rm = require("../models/resModel");

let home = (req, res) => {
  res.render("home");
};
let reg = (req, res) => {
  res.render("reg", { msg: "" });
};
let add = async (req, res) => {
  try {
    let data = new rm(req.body);
    await data.save();
    console.log(data)
    res.render("reg", { msg: "Data stored successfully!" });
  } catch (error) {
    console.log(error.message);
 
    res.render("error", { msg: "Error in storing data" });
  } 
};
let disp = async (req, res) => {
  try {
    let data = await rm.find();

    res.render("disp", { data: data });
  } catch (error) {
    res.render("error", { msg: "error in displaying data" });
  }
};

let edit = async (req, res) => {
  try {
    let data = await rm.findById(req.params.id);
    res.render("edit", { data: data });
  } catch {
    res.render("error", { msg: "Error in fetching data" });
  }
};

let upd = async (req, res) => {
  try {
    await rm.findByIdAndUpdate({ _id: req.body._id }, req.body);
    res.redirect("/disp");
  } catch {
    res.render("error", { msg: "Error in updating data" });
  }
};
let del = async (req, res) => {
  try {
    await rm.findByIdAndDelete(req.params.id);
    res.redirect("/disp");
  } catch {
    res.render("error", { msg: "error in deleting data" });
  }
};

let sort = async (req, res) => {
  try {
    let data = await rm.find().sort({ [req.params.col]: 1 });
    res.render("disp", { data: data });
  } catch {
    res.render("error", { msg: "Error in sorting data" });
  }
};

let getsearch = (req, res) => {
  res.render("search", { data: null, msg: "" });
};
let search = async (req, res) => {
  try {
    let data = await rm.findById(req.query._id);
    if (data) {
      res.render("search", { data: data, msg: "" });
    } else {
      res.render("search", { data: null, msg: "Check Hall Ticket Number" });
    }
  } catch {
    res.render("error", { msg: "error in searching data" });
  }
};
module.exports = {
  home,
  add,
  reg,
  disp,
  edit,
  upd,
  del,
  sort,
  getsearch,
  search,
};
