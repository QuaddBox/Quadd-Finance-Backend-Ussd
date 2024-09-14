const express = require("express")
const ussdController = require("../controllers/ussdController")
const { useUssdText } = require("../middlewares/ussd/useUssdText")
const { useUserDetails  } = require("../middlewares/ussd/useUserDetails")
const ussdRoutes = express.Router()

ussdRoutes.get("/",ussdController.index)
ussdRoutes.post("/",useUssdText,useUserDetails,ussdController.index,ussdController.main)

module.exports = ussdRoutes


