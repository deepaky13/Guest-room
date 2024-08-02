import mongoose from "mongoose";
import { ROOM_STATUS } from "../utils/constants.js";

const ownerschema = mongoose.Schema(
  {
    ownerName: String,
    roomName: String,
    roomDesc: String,
    minBookingPeriod: String,
    maxBookingPeriod: String,
    rentamount: String,
    floorSize: String,
    numberOfBeds: String,
    amenities: String,
    imageUrl: String,
    availability: {
      type: String,
      enum: Object.values(ROOM_STATUS),
      default: ROOM_STATUS.AVAILABLE,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("owner", ownerschema);
