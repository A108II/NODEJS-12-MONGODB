const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Handle user login 
const handleLogin = async (req, res) => {
  const { username, password } = req.body; // destructure username and password from req.body
  if (!username || !password) return res.status(400).json({ "message": "Bad request, please provide both username and password" });
  const foundUser = await User.findOne({username: username}).exec();
  if (!foundUser) {
    return res.status(400).json({ "message": "Could not find the corresponding username" })
  }
  // Compare password provided by the user and the password in the database
  const pwd_recognized = await bcrypt.compare(password, foundUser.password);
  if (pwd_recognized) {
    const roles = Object.values(foundUser.roles);
    const accesToken = jwt.sign(
      {
        UserInfo: { // JWT private claim 
          "username": foundUser.username,
          "roles": roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' },
    )
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' },
    )
    // Save refresh token with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    // Cookie name: jwt, value: refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true, // Makes it inaccessible to client-side javascript, it is only accessible in http protocol 
      sameSite: 'None',  // Allows cookie to be included inside the requests made from other origins (websites)
      // secure: true, // Cookie is only sent over https
      maxAge: 24 * 60 * 60 * 1000 // Sets the cookie expiration to 24 hours , 86400000 miliseconds
    })
    res.json({ accesToken });
  }
}

module.exports = { handleLogin };

// Note:
// JWT token contains header:  1.alg:HS256 2.typ:jwt + payload: { { UserInfo: { "username": foundUser.username,"roles": roles}, iat:1635485575 , exp:1635485605 } + Secret token