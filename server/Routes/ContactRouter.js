const { createContact, getContacts, deleteContacts } = require("../Controllar/ContactControllar")

const ContactRouter = require("express").Router()

ContactRouter.post("/contact" ,createContact)
ContactRouter.get("/contact" ,getContacts)
ContactRouter.delete("/contact/:id" ,deleteContacts)

module.exports = ContactRouter