/* const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  passport: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema); */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  passport: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Employee', employeeSchema);



// Mongoose model creates the model and set "Employee" to lowercase and makes it plural, it will be "employees" 
// So mongoose will look for plural lowercased version of the model, the model Employee corresponds to employees collection in database



