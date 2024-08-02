import owner from "../model/ownerMOdel.js";
import { ROOM_STATUS } from "../utils/constants.js";

//------------ geting all the house details-------------------

export const getAllHouseDetails = async (req, res) => {
  try {
    const { availability } = req.query;
    let houses = await owner.find();

    if (availability && Object.values(ROOM_STATUS).includes(availability)) {
      houses = houses.filter((house) => house.availability === availability);
    }

    const ownerHouseCount = houses.reduce((acc, house) => {
      const ownerId = house.createdBy.toString();
      if (!acc[ownerId]) {
        acc[ownerId] = { count: 0, details: [] };
      }
      acc[ownerId].count++;
      acc[ownerId].details.push(house);
      return acc;
    }, {});

    const result = Object.keys(ownerHouseCount).map((ownerId) => ({
      ownerId,
      numberOfHouses: ownerHouseCount[ownerId].count,
      houses: ownerHouseCount[ownerId].details,
    }));

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//------------ geting particular the house details-------------------
export const getHouseDetails = async (req, res) => {
  try {
    const house = await owner.findById(req.params.id);
    res.status(200).json({ house });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//------------ deleting the house details-------------------

export const deleteHouseDetails = async (req, res) => {
  try {
    const removeHouse = await owner.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ removeHouse, msg: "House details has been updated" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
