const auth = require("../auth");

function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    auth.verifyToken(token);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authMiddleware;
