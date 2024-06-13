import jwt from "jsonwebtoken";
import createError from "http-errors";
import config from "../config/config.json" assert { type: "json" };

/**
 * This function use to verify a given JWT token
 * @param {Http Request} req
 * @param {Http Response} res
 * @param {NextFunction} next
 * @returns 
 */
const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError.Unauthorized("Authorization header is missing"));
  }

  // Check if the header format is correct
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(createError.Unauthorized("Bearer token is missing"));
  }

  // Verify the token
  jwt.verify(token, config?.auth?.jwtSecretKey, (err, decoded) => {
    if (err) {
      return next(createError.Unauthorized("Invalid token"));
    }
    // Token is valid, attach decoded payload to request object
    req.user = decoded;
    next();
  });
};

export default verifyToken;
