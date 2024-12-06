const Reservation = require("../Model/HotelModel");

const createReservation = async (req, res) => {
    try {
        console.log(req.body);
        const { where, checkIn, checkOut, numberofroom, adults, children, hotelname, hotelemail, hotelphone, hoteladdress } = req.body;
        const errorMessage = [];

        if (!where) errorMessage.push("Please provide the location of the hotel.");
        if (!checkIn) errorMessage.push("Check-in date is required.");
        if (!checkOut) errorMessage.push("Check-out date is required.");
        if (!numberofroom) errorMessage.push("Please specify the number of rooms.");
        if (!adults) errorMessage.push("Number of adults is required.");
        if (!hotelname) errorMessage.push("Name is required.");
        if (!hotelemail) errorMessage.push("Email is required.");
        if (!hotelphone) errorMessage.push("Phone number is required.");
        if (!hoteladdress) errorMessage.push("Address is required.");

        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: errorMessage.join(", "),
            });
        }

        const newReservation = new Reservation({
            where,
            checkIn,
            checkOut,
            numberofroom,
            adults,
            children,
            hotelname,
            hotelemail,
            hotelphone,
            hoteladdress,
        });

        await newReservation.save();
        res.status(200).json({
            success: true,
            message: "Reservation created successfully",
            data: newReservation,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Controller to get all reservations
const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        if (!reservations || reservations.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No reservations found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Reservations retrieved successfully",
                data: reservations,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const deleteHotelQuery = async (req, res) => {
    try {
        const { id } = req.params
        const hotel = await Reservation.findById(id);
        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel Query Not Found"
            })
        }
        await hotel.deleteOne()
        res.status(200).json({
            message: "Hotel Query Delete Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    createReservation,
    getReservations,
    deleteHotelQuery
};
