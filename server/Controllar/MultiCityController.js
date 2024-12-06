const MultiCity = require("../Model/multiCityFlightEnquery");

exports.createMultiCity = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            address,
            allCity,
        } = req.body;

        // Initialize errorMessage array to capture validation errors
        let errorMessage = [];

        // Validate required fields
        if (!name) errorMessage.push("Name is required");
        if (!email) errorMessage.push("Email is required");
        if (!phone) errorMessage.push("Phone number is required");
        if (!address) errorMessage.push("Address is required");
        if (!allCity || allCity.length === 0) errorMessage.push("At least one city is required");

        // Validate fields inside allCity array
        if (allCity && allCity.length > 0) {
            allCity.forEach((city, index) => {
                if (!city.from) errorMessage.push(`From Date is required for All city `);
                if (!city.to) errorMessage.push(`To Date is required for All city `);
                if (!city.departure) errorMessage.push(`Departure Date is required for All city`);
                if (city.totalAdults === undefined || city.totalAdults === null) {
                    errorMessage.push(`Total Adults is required for All city `);
                }
            });
        }

        // If there are validation errors, return them
        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errorMessage,
            });
        }

        // Create the MultiCity record
        const newMultiCity = new MultiCity({
            name,
            email,
            phone,
            address,
            allCity,
        });

        // Perform Mongoose validation and save
        try {
            await newMultiCity.validate();  // Validate using Mongoose schema
            await newMultiCity.save();  // Save the record
            res.status(201).json({
                success: true,
                message: "MultiCity created successfully",
                data: newMultiCity,
            });
        } catch (err) {
            console.error('Mongoose validation failed:', err);
            // Catch validation errors from Mongoose (if any)
            return res.status(400).json({
                success: false,
                message: "Validation failed in Mongoose",
                errors: err.errors,
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};





// Get all MultiCity records
exports.getAllMultiCities = async (req, res) => {
    try {
        const multiCities = await MultiCity.find();
        res.status(200).json({
            success: true,
            data: multiCities,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Get a single MultiCity by ID
exports.getMultiCityById = async (req, res) => {
    try {
        const multiCity = await MultiCity.findById(req.params.id);

        if (!multiCity) {
            return res.status(404).json({
                success: false,
                message: "MultiCity not found",
            });
        }

        res.status(200).json({
            success: true,
            data: multiCity,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Update MultiCity details
exports.updateMultiCity = async (req, res) => {
    try {
        const { name, email, phone, address, allCity } = req.body;

        const updatedMultiCity = await MultiCity.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                phone,
                address,
                allCity,
            },
            { new: true }
        );

        if (!updatedMultiCity) {
            return res.status(404).json({
                success: false,
                message: "MultiCity not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "MultiCity updated successfully",
            data: updatedMultiCity,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Delete MultiCity
exports.deleteMultiCity = async (req, res) => {
    try {
        const deletedMultiCity = await MultiCity.findByIdAndDelete(req.params.id);

        if (!deletedMultiCity) {
            return res.status(404).json({
                success: false,
                message: "MultiCity not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "MultiCity deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

