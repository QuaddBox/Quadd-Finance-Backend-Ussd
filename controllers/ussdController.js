import { balanceEnquiryHandler } from "../services/ussd/balanceEnquiry.js"
import { USSDService } from "../services/ussdServices.js"


const UssdController = {
    index:async(req,res,next)=>{
        if(req.user) return next()

        const ussdServiceHandler = new USSDService(res,req)
        const { ussdText,ussdTextCount,payload,ussdTextArray} = req.ussdText

        if(ussdText === "") return ussdServiceHandler.sendWelcomeResponse(payload)

        if(ussdText === "1") return ussdServiceHandler.handleRegisterDefault(payload)

        if(ussdTextCount == 2 ) return ussdServiceHandler.handleRegisterPhone(payload)

        if(ussdTextCount === 3 ) return ussdServiceHandler.handleRegisterPin(payload)

        if(ussdTextCount === 4 ) return ussdServiceHandler.endRegisteration({
            name: ussdTextArray[1],
            phone: ussdTextArray[2],
            pin: ussdTextArray[3],
        })
    },

    main:async(req,res)=>{
        const ussdServiceHandler = new USSDService(res,req)
        const { ussdText,ussdTextCount,ussdTextArray} = req.ussdText
        if(ussdText === "") return ussdServiceHandler.sendMainWelcomeResponse()
        f(ussdText === "1") return await balanceEnquiryHandler({
            res,
            data:ussdTextArray,
            dataCount:ussdTextCount,
            user:req.user
        })
        return ussdServiceHandler.sendMainWelcomeResponse()
    }

}

export default UssdController;