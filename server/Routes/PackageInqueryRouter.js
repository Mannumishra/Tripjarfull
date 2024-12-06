const { createInquiry, getInquiries, deletePackageQuery } = require("../Controllar/PackageInqueryControllar")

const PackageInquery = require("express").Router()

PackageInquery.post("/package-inquery" ,createInquiry)
PackageInquery.get("/package-inquery" ,getInquiries)
PackageInquery.delete("/package-inquery-delete/:id" ,deletePackageQuery)

module.exports = PackageInquery