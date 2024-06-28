const User = require('../model/User');

const handleLogOut = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    console.log("No cookie found");
    return res.sendStatus(204) // No content to send back by response body
  }
  // If there is refresh token, compare refresh token with the refresh token in database, and get the corrsponding user
  const refreshToken = cookie.jwt;
  const user_match = await User.findOne({refreshToken}).exec();
  if (!user_match) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }
  // Delete refresh token from database, if there is corresponding refresh token
  user_match.refreshToken = ''
  const result = await user_match.save();
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', /*secure: true*/ });
  res.sendStatus(204);

}

module.exports = { handleLogOut };