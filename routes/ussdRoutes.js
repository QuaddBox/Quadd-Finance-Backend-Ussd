import { Router } from  "express"
import UssdController  from "../controllers/ussdController.js"
import { useUssdText } from "../middlewares/ussd/useUssdText.js"
import { useUserDetails  } from "../middlewares/ussd/useUserDetails.js"
const ussdRoutes = Router()


ussdRoutes.get("/",UssdController.index)
ussdRoutes.post("/",useUssdText,useUserDetails,UssdController.index,UssdController.main)

export default ussdRoutes


