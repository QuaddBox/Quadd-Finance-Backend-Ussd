import { currencies } from "../../lib/currencies.js" 
import { USSDService } from "../ussdServices.js"

export const balanceEnquiryHandler = async ({res,user,data,dataCount})=>{
    console.log({user,dataCount})
    const responseHandler = new USSDService(res)
    console.log(dataCount)

    if(dataCount > 2){
        return responseHandler.endBalanceCheck({
            currency:currencies[parseInt(data[2]) - 1],
            amount:user.balance
        })
    }
    if(dataCount > 1){
        if(data[dataCount-1] !== user.pin) return responseHandler.sendIncorrectPinResponse()
        return responseHandler.checkBalanceCurrency()
    }
    return responseHandler.checkBalanceStart()
}