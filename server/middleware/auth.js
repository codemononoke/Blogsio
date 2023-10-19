const jwt = require("jsonwebtoken");

const getAccessToRoute = (req, res, next) => {
  const access_token =
    req.cookies.access_token ||
    req.body.access_token ||
    req.header("Authorization").split(" ")[1];

  if (!access_token) {
    return res.status(401).json({ success: false, message: `Token Missing` });
  }

  const { JWT_SECRET_KEY } = process.env;
  jwt.verify(access_token, JWT_SECRET_KEY, (err, dec) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }

    req.user = {
      id: dec.id,
    };

    next();
  });
};

module.exports = {
  getAccessToRoute,
};
