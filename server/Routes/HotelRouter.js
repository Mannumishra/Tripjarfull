const { createReservation, getReservations, deleteHotelQuery } = require("../Controllar/HoltelControllar")

const HotelRouter = require("express").Router()

HotelRouter.post("/hotel" ,createReservation)
HotelRouter.get("/hotel" ,getReservations)
HotelRouter.delete("/hotel/:id" ,deleteHotelQuery)

module.exports = HotelRouter