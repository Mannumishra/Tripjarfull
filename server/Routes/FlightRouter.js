const { createFlight, getDetails, deleteFlight } = require("../Controllar/FlightControllar")

const FlightRouter = require("express").Router()

FlightRouter.post("/flight" , createFlight)
FlightRouter.get("/flight" , getDetails)
FlightRouter.delete("/flight-delete/:id" , deleteFlight)

module.exports = FlightRouter