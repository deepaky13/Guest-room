import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../Error/customError.js";
import { verifyToken } from "../utils/tokenutils.js";

//-------------validating the user----------------

export const validateUser = (req, res, next) => {
  const { token } = req.cookies;
  console.log("token : ", token);
  if (!token) throw new UnauthenticatedError("Authenticaton Invald");
  try {
    const { userId, role } = verifyToken(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentication invalid");
  }
};
