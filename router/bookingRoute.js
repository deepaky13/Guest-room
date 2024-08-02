import mongoose from "mongoose";
import { Router } from "express";
import {
  BookingRoom,
  deleteBookedRoom,
  editBookedRoom,
  getBookedRoom,
  getReservedRoom,
} from "../controllers/bookingController.js";
import { body, param } from "express-validator";
import booking from "../model/BookingModel.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../Error/customError.js";
import { WithValidationErrors } from "../Middleware/errorHandlerMiddleware.js";
import { validateUser } from "../Middleware/authmiddleware.js";

const router = Router();

//---------validation for booking detalis---------------------

export const validateBookingDetails = WithValidationErrors([
  body("guestName").notEmpty().withMessage("Guest Name is must required"),
  body("date").notEmpty().withMessage("Booking date  is must required"),
  body("guestCount").notEmpty().withMessage("Define number of Guests"),
  body("daysCount").notEmpty().withMessage("Define Number of days needed"),
  body("roomId").notEmpty().withMessage("Room id is missing"),
  body("roomName").notEmpty().withMessage("roomName is missing"),
]);
//-------------validaton for actual guest-----------------------
export const validateGuestIdParam = WithValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("Invalid MongoDB Id ");
    const bookingHouse = await booking.findById(value);
    console.log(req.user);
    if (!bookingHouse) throw new NotFoundError(`no house with id :${value}`);
    const isOwner = req.user.userId === String(bookingHouse.createdBy); //same user
    console.log(isOwner);
    if (!isOwner) throw new UnauthorizedError("not authorized to access ");
  }),
]);

router
  .route("/")
  .get(getBookedRoom)

  .post(validateBookingDetails, validateUser, BookingRoom);
router
  .route("/:id")
  .patch(
    validateBookingDetails,
    validateUser,
    validateGuestIdParam,
    editBookedRoom
  )
  .delete(deleteBookedRoom);

router.route("/reserved").get(validateUser, getReservedRoom);

export default router;
