import { USSDService } from "../ussdServices.js"

export const balanceEnquiryHandler = ({res,user,data,dataCount})=>{
    console.log({user,dataCount})
    const responseHandler = new USSDService(res)
    if(dataCount === 1){
        return responseHandler.checkBalanceStart()
    }
    if(dataCount === 2){
        if(data[dataCount-1] !== user.pin) return responseHandler.sendIncorrectPinResponse()
        return responseHandler.checkBalanceCurrency()
    }
    if(dataCount === 3){
        return responseHandler.endBalanceCheck({
            currency:data[2]
        })
    }
}