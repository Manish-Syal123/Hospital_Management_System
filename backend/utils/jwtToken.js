export const generateToken = (user, message, statusCode, res) => {
  // when the new user is created the methods created in it's schema(userSchema.js) is also attached to it.
  const token = user.generateJsonWebToken(); // we had already created this generateJsonWebToken() method in userSchema.js to generate JWTToken
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ), // (7days * hour(24) * minute(60) *second(60) * miliSecond(1000))
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
