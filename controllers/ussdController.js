const { balanceEnquiryHandler } = require("../services/ussd/balanceEnquiry")
const { USSDService } = require("../services/ussdServices")


module.exports = {
    index:(req,res,next)=>{
        if(req.user) return next()

        const ussdServiceHandler = new USSDService(res)
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

    main:(req,res)=>{
        const ussdServiceHandler = new USSDService(res)
        const { ussdText,ussdTextCount,ussdTextArray} = req.ussdText
        if(ussdText === "") return ussdServiceHandler.sendMainWelcomeResponse()
        if(ussdText === "1") return balanceEnquiryHandler(res,{
            data:ussdTextArray,
            dataCount:ussdTextCount
        })
        return ussdServiceHandler.sendMainWelcomeResponse()
    }

}