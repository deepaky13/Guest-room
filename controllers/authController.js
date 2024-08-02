import { UnauthenticatedError } from "../Error/customError.js";
import { errorHandlerMiddleware } from "../Middleware/errorHandlerMiddleware.js";
import User from "../model/userModel.js";
import { comparePassword, encryptPassword } from "../utils/passwordUtils.js";

import { generateToken } from "../utils/tokenutils.js";

//--------------------User Registration--------------------

export const register = async (req, res) => {
  try {
    const { role, password, ...rest } = req.body;

    if (!role) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    const encryptedPassword = await encryptPassword(password);
    const user = await User.create({
      ...rest,
      password: encryptedPassword,
      role,
    });

    res.status(201).json({ msg: "User created", user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ msg: "Error creating user", error });
  }
};

//----------------------User Login-------------------------

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });

    const isValidUser =
      user && (await comparePassword(req.body.password, user.password));
    if (!isValidUser) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    //---------------- Generating token----------------------
    const token = generateToken({ userId: user._id, role: user.role });

    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
    });

    res.status(200).json({ msg: "User is logged in" });
  } catch (error) {
    errorHandlerMiddleware(error, req, res);
  }
};

//---------------User Logout---------------------------
export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "user logged out" });
};
