import { Router } from "express";
import { body } from "express-validator";
import userModel from "../model/userModel.js";
import { BadRequestError } from "../Error/customError.js";
import { register, login, logout } from "../controllers/authController.js";
import { WithValidationErrors } from "../Middleware/errorHandlerMiddleware.js";
const router = Router();

//---------------validaton for registration--------------
export const validateRegisterInput = WithValidationErrors([
  body("name").notEmpty().withMessage("Name must required"),
  body("password").notEmpty().withMessage("password  must required "),
  body("mobileNumber")
    .notEmpty()
    .withMessage("Mobile Number must required")
    .isLength({ min: 10, max: 10 }),
  body("email")
    .notEmpty()
    .withMessage("Email must required")
    .isEmail()
    .withMessage("Invalid Email Formate")
    .custom(async (email) => {
      const user = await userModel.findOne({ email });
      if (user) {
        throw new BadRequestError("Email is already exits");
      }
    }),
]);

//---------------validation for login----------------------
export const validateLoginInput = WithValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email must required")
    .isEmail()
    .withMessage("Invalid Email Formate"),
  body("password").notEmpty().withMessage("password  must required "),
]);

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
