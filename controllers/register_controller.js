const User = require('../model/User')
const bcrypt = require('bcrypt');

// Handling new user
const handle_new_user = async (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) return res.status(400).json({"Error message": "Please provide both username and password"});
  // Preveting duplication in the data base
  const duplication_exists = await User.findOne({username: username}).exec();
  if(duplication_exists){
    return res.status(409).json({"Error message": "User already exists"});
  }
  try {
    const hashed_password = await bcrypt.hash(password, 10);  // cost factor: 10
    // Create user and store it in db
    const result = await User.create({
      username: username,
      password: hashed_password
    })
    console.log(result);
    res.status(201).json({"Success message": `New user with ${username} username just created!`});  
  } catch (error) {
    res.status(500).json({"Error message": `${error.message}`});
  }
}

module.exports = {handle_new_user};

// Notes:
// User collection where the username field matches the given username.
// .exec() executes this query and returns a Promise.
// await is used to wait for the Promise to resolve, which allows us to work with the result in a synchronous-like manner.