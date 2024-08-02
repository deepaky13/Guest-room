import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
  guestName: String,
  date: String,
  guestCount: String,
  daysCount: String,
  roomId:String,
  roomName:String,
  imageUrl:String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("guest", BookingSchema);
