/**
 * This middleware should handle all errors
 */
module.exports = (app) => {
  app.use((error, req, res, next) => {
    // Errors from mongoose
    if (error.name === 'ValidationError') {
      // Errors from mongoose come like this: {Schema} ValidationError: {type}: {message}
      // This is the reason to split string
      const message = error.message.split(':');

      return res.status(422).send(message[message.length - 1].trim());
    }

    return next(error);
  });

  // All unexpected errors
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => res.status(err.status || 500).send(err.message || 'Internal Server Error.'));
};
