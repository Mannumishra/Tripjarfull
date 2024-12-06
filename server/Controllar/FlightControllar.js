const flight = require("../Model/FlightModel");

const createFlight = async (req, res) => {
    try {
        console.log(req.body)
        const { from, to, departure, returnDate, totalAdults, totalChildren, name, email, phone, address } = req.body;
        const errorMessage = [];
        if (!from) errorMessage.push("Departure airport (From) is required.");
        if (!to) errorMessage.push("Arrival airport (To) is required.");
        if (!departure) errorMessage.push("Departure date is required.");
        if (!totalAdults) errorMessage.push("Total number of adults is required.");
        if (!name) errorMessage.push("Name is required.");
        if (!email) errorMessage.push("Email is required.");
        if (!phone) errorMessage.push("Phone number is required.");
        if (!address) errorMessage.push("Address is required.");
        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: errorMessage.join(", "),
            });
        }
        const data = new flight({
            from,
            to,
            departure,
            returnDate,
            totalAdults,
            totalChildren,
            name,
            email,
            phone,
            address,
        });

        await data.save();
        res.status(200).json({
            success: true,
            message: "Request Send Successfully",
            data: data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getDetails = async (req, res) => {
    try {
        const data = await flight.find()
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Details Not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Details Found Successfully",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const deleteFlight = async (req, res) => {
    try {
        const { id } = req.params
        const data = await flight.findById(id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        await data.deleteOne()
        return res.status(200).json({
            success: false,
            message: "Record Delete Successfully",
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createFlight, getDetails, deleteFlight
}