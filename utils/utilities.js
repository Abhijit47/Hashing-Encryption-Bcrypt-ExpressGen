
const successResponse = (res, message, statusCode, data) => {
  return res.status(statusCode).json({ message: message, data: data });
};

const errorResponse = (res, message, statusCode) => {
  return res.status(statusCode).json({ message: message });
};


module.exports = { successResponse, errorResponse };