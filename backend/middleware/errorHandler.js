import { CustomAPIError } from '../errors/customError.js';

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError)
    return res.status(err.statusCode).json({ error: err.message });

  if (err.name === 'ValidationError') {
    const validationErrors = {};

    Object.keys(err.errors).forEach(
      key => (validationErrors[key] = err.errors[key].message)
    );

    return res.status(400).json({ error: validationErrors });
  }

  return res
    .status(500)
    .json({ error: 'Something went wrong, please, try again later!' });
};

export default errorHandler;
