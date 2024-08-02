import BookingModel from "../model/BookingModel.js";

//--------------- Boookig the rooms------------------
export const BookingRoom = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const bookRoom = await BookingModel.create(req.body);
    res.status(201).json({ bookRoom });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//--------------- booked room info------------------

export const getBookedRoom = async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
export const getReservedRoom = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);

    const bookedRoom = await BookingModel.find({ createdBy: userId });
    console.log(bookedRoom);
    res.status(200).json({ bookedRoom });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//*--------------- Editing the room details------------------
export const editBookedRoom = async (req, res) => {
  try {
    const updatedHouse = await BookingModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user.userId,
      },
      { new: true }
    );

    if (!updatedHouse) {
      return res.status(404).json({ msg: "House not found" });
    }

    res
      .status(200)
      .json({ updatedHouse, msg: "House details have been updated" });
  } catch (error) {
    res.status(500).json({ msg: err });
  }
};

//*--------------- deleting the room details------------------
export const deleteBookedRoom = async (req, res) => {
  console.log(req.user);
  try {
    const deletedBookedRoom = await BookingModel.findByIdAndDelete(
      req.params.id
    );
    res
      .status(200)
      .json({ deletedBookedRoom, msg: "deleted the booking details" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
