//--------- Necessary packages for the developement---------------
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import multer from "multer";
import owner from "./model/ownerMOdel.js";

app.use(express.json());
app.use(cookieParser());

//----------------------------Routers-------------------------------

import router from "./router/authRouter.js";
import ownerRouter from "./router/ownerRouter.js";
import bookingRouter from "./router/bookingRoute.js";
import userRouter from "./router/userRouter.js";
//---------------------------middleware-------------------------------

import { errorHandlerMiddleware } from "./Middleware/errorHandlerMiddleware.js";
import { validateUser } from "./Middleware/authmiddleware.js";

//-----------Dynamic storing of multimedia-------------------------

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Use memory storage for Cloudinary uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post(
  "/api/v1/houses",
  validateUser,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const {
        ownerName,
        roomName,
        roomDesc,
        minBookingPeriod,
        maxBookingPeriod,
        rentamount,
        floorSize,
        numberOfBeds,
        amenities,
        availability,
      } = req.body;

      const cloudinaryUpload = new Promise((resolve, reject) => {
        const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
          {
            folder: "cloud-image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        cloudinaryStream.write(req.file.buffer);
        cloudinaryStream.end();
      });

      const cloudinaryResult = await cloudinaryUpload;
      const imageUrl = cloudinaryResult.secure_url;

      const newHouse = new owner({
        ownerName,
        roomName,
        roomDesc,
        minBookingPeriod,
        maxBookingPeriod,
        rentamount,
        floorSize,
        numberOfBeds,
        amenities,
        availability,
        imageUrl,
        createdBy: req.user.userId,
      });

      await newHouse.save();

      res
        .status(201)
        .json({ message: "House data and image uploaded successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
app.patch("/api/v1/houses/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: "cloud-image" }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          })
          .end(req.file.buffer);
      });
      updateData.imageUrl = cloudinaryResult.secure_url;
    }

    const updatedHouse = await owner.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedHouse) {
      return res.status(404).json({ msg: "House not found" });
    }

    res
      .status(200)
      .json({ updatedHouse, msg: "House details have been updated" });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ msg: error.message });
  }
});

//----------Track back the status of REST api---------------------
if (process.env.NODE_ENV === "develop") {
  app.use(morgan("dev"));
}

//-------------------------Building Blocks------------------------

app.use("/api/v1/auth", router);
app.use("/api/v1/house", ownerRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/users", userRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

//------- server connection and Database connection---------------
const port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
