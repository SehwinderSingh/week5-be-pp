const unknownEndpoint = (req, res) => {
  res.status(404).json({ message: 'Unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  res.status(500).json({
    message: 'Something went wrong!',
  });
};
 
module.exports = { unknownEndpoint, errorHandler };