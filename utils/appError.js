
// appError.js
const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(error, createError);

    return error;
};

export default createError;
