const PackageInquiry = require('../Model/PackageQueryModel');

exports.createInquiry = async (req, res) => {
    try {
        const { packageCity, name, email, phone, address } = req.body;
        const errorMessage = []
        if (!packageCity) errorMessage.push("Package City Is Must Required")
        if (!name) errorMessage.push("Name Is Must Required")
        if (!email) errorMessage.push("Email Is Must Required")
        if (!phone) errorMessage.push("Phone number  Is Must Required")
        if (!address) errorMessage.push("Address Is Must Required")

        if (errorMessage.length > 0) {
            return res.status(401).json({
                success: false,
                message: errorMessage.join(",")
            })
        }
        const newInquiry = new PackageInquiry({
            packageCity,
            name,
            email,
            phone,
            address
        });
        const savedInquiry = await newInquiry.save();
        res.status(200).json({
            success: true,
            message: "Your Query Send Successfully",
            data: savedInquiry
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.getInquiries = async (req, res) => {
    try {
        const inquiries = await PackageInquiry.find();
        res.status(200).json({
            success: true,
            data: inquiries
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePackageQuery = async (req, res) => {
    try {
        const { id } = req.params
        const package = await PackageInquiry.findById(id);
        if (!package) {
            return res.status(404).json({
                success: false,
                message: "Package Not Found"
            })
        }
        await package.deleteOne()
        res.status(200).json({
            message: "Package Enquery Delete Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

