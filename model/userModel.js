import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobileNumber: String,
    password: String,

    role: {
      type: String,
      enum: ["guest", "owner"],
      default: "guest",
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
