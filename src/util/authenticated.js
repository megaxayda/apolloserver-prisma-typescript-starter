const { AuthenticationError } = require("apollo-server-express");

const authenticated = next => (root, args, context, info) => {
  if (!context.currentUser) {
    throw new AuthenticationError(`Unauthenticated!`);
  }

  return next(root, args, context, info);
};

module.exports = authenticated;
