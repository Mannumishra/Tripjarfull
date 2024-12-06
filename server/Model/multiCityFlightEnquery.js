const mongoose = require("mongoose")

const allcitySchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, "Please fill Form details"]
    },
    to: {
        type: String,
        required: [true, "Please fill To details"]
    },
    departure: {
        type: Date,
        required: [true, "Please fill Date"]
    },
    totalAdults: {
        type: Number,
        required: [true, "fill Adults details"]
    }
    ,
    totalChildren: {
        type: Number,
    }
})
const MultiCitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "fill Name "]
    },
    email: {
        type: String,
        required: [true, "fill  Email"]
    },
    phone: {
        type: Number,
        required: [true, "fill Phone "]
    },
    address: {
        type: String,
    },
    allCity: [allcitySchema]
}, { timestamps: true })

const MultiCity = mongoose.model("Multy-city", MultiCitySchema)

module.exports = MultiCity