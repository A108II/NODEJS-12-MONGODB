const Employee = require('../model/Employee');

const get_all_employees = async (req, res) => {
  const employees = await Employee.find(); // Finds all the employees
  if(!employees) return res.status(204).json({"message": "No employee found"});
  res.json(employees);
};

const add_employee = async (req, res) => {
  if(!req?.body?.passport || !req?.body?.firstname || !req?.body?.lastname){
    return res.status(400).json({"message": "Please privide necessary information"});
  }
  try {
    const result = Employee.create({
      passport: req.body.passport,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    })
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
}

const update_employee = async (req, res) => {
  if(!req?.body?.id){
    return res.status(400).json({"message": "Please provide user ID"});
  }
  const employee = await Employee.findOne({ _id: req.body.id}).exec();
  if(!employee){
    return res.send(204).json({"message": "Could not find the requested employee!"});
  }
  if(req.body?.passport) employee.passport = req.body.passport;
  if(req.body?.firstname) employee.firstname = req.body.firstname;
  if(req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const delete_employee = async (req, res) => {
  if(!req?.body?.id){
    return res.status(400).json({"message":"Please provide user ID"});
  }
  const employee = await Employee.findOne({_id: req.body.id});
  if(!employee){
    res.status(204).json({"message": "Could not find the requested employee!"});
  }
  const result = await employee.deleteOne({_id: req.body.id});
  res.json(result);
}

const get_emp_id = async (req, res) => {
  if(!req?.params?.id){
    return res.status(400).json({"message": "Please provide user ID"});
  }
  const employee = await Employee.findOne({_id: req.params.id});
  if(!employee){
    return res.status(204).json({"message": "Could not find the requested employee"});
  }
  res.json(employee);
};

module.exports = {
  get_all_employees,
  add_employee,
  update_employee,
  delete_employee,
  get_emp_id,
};

