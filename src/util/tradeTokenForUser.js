const jwt = require("jsonwebtoken");

function tradeTokenForUser(token, db) {
  const decoded = jwt.verify(token, process.env.SECRET);
  if (decoded.type === "AUTHOR") {
    return db.collection("authors").findOne({ username: decoded.username });
  }
  if (decoded.type === "ADMIN") {
    return db.collection("admin").findOne({ username: decoded.username });
  }
  return Promise.resolve(null);
}

module.exports = tradeTokenForUser;
