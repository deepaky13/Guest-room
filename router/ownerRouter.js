import mongoose from "mongoose";
import { Router } from "express";
import {
  deleteHouseDetails,
  getAllHouseDetails,
  getHouseDetails,
} from "../controllers/ownerController.js";
import { WithValidationErrors } from "../Middleware/errorHandlerMiddleware.js";
import { body, param } from "express-validator";
import owner from "../model/ownerMOdel.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../Error/customError.js";

const router = Router();

//-------------validating the house details----------------

export const validateHouseDetails = WithValidationErrors([
  body("ownerName").notEmpty().withMessage("Owner Name is must required"),
  body("roomName").notEmpty().withMessage("Room Name is must required"),
  body("roomDesc").notEmpty().withMessage("Room Description is must required"),
  body("minBookingPeriod")
    .notEmpty()
    .withMessage("define minimum booking period"),
  body("maxBookingPeriod")
    .notEmpty()
    .withMessage("define minimum booking period"),
  body("rentamount").notEmpty().withMessage("Define an amount per day"),
  body("imageUrl").notEmpty().withMessage("image is required"),
  body("floorSize").notEmpty().withMessage("roomSize is required"),
  body("numberOfBeds").notEmpty().withMessage("numberOfBeds is required"),
  body("amnenities").notEmpty().withMessage("amnenities is required"),
  body("availability").notEmpty().withMessage("Room status is required"),
]);

//---------validating the action was done by actual user-------
export const validateIdParam = WithValidationErrors([
  param("id").custom(async (value, { req }) => {
    console.log(req.user);

    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("Invalid MOngoDB Id ");
    const house = await owner.findById(value);

    if (!house) throw new NotFoundError(`no house with id :${value}`);
    console.log("house:", house);
    const isAdmin = req.user.role === "owner"; //role is owner or not
    const isOwner = req.user.userId === String(owner.createdBy); //same user
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("not authorized to access ");
  }),
]);

router.route("/").get(getAllHouseDetails);
router
  .route("/:id")
  .get(getHouseDetails)
  .delete(   deleteHouseDetails);

export default router;
