import { errorHandlerMiddleware } from "../Middleware/errorHandlerMiddleware.js";
import userModel from "../model/userModel.js";

//-----------getting the current user --------------------------
export const getCurrentUser = async (req, res) => {
  const user = await userModel.findOne({ _id: req.user.userId });
  res.status(200).json({ user });
};

//---------------Getting the role of the specified email----------
export const getUserRole = async (req, res) => {
  const email = req.params.email;

  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ msg: `no user with email ${errorHandlerMiddleware}` });
  }
  res.status(200).json({ user });
};
