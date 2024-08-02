import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../Error/customError.js";
import { validationResult } from "express-validator";

export const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong ,try again later";
  res.status(statusCode).json({ msg }); //generic server
  console.log(err);
};

export const WithValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (errorMessages[0].startsWith("No feed back")) {
          throw new NotFoundError(errorMessages);
        }

        if (errorMessages[0].startsWith("Invalid credientials")) {
          throw new UnauthenticatedError("Invalid credentials");
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};
