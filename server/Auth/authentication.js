const JWT = require("jsonwebtoken");

const secret = "$uperMan@123";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    username:user.username
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  console.log('correct user')
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};