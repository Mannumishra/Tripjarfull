const express = require("express");
const { createMultiCity, getAllMultiCities, getMultiCityById, updateMultiCity, deleteMultiCity } = require("../Controllar/MultiCityController");
const MultiCityRouter = express.Router();

// CRUD Operations for MultiCity
MultiCityRouter.post("/send-data", createMultiCity);
MultiCityRouter.get("/get-all-enquery", getAllMultiCities);
MultiCityRouter.get("/get-single-enquery:id", getMultiCityById);
MultiCityRouter.put("/update-record/:id", updateMultiCity);
MultiCityRouter.delete("/delete-record/:id", deleteMultiCity);

module.exports = MultiCityRouter;
