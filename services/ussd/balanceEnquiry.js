import { USSDService } from "../ussdServices.js"

export const balanceEnquiryHandler = (res,{data,dataCount})=>{
    const responseHandler = new USSDService(res)
    if(dataCount === 1){
        return responseHandler.checkBalanceStart()
    }
    if(dataCount === 2){
        return responseHandler.checkBalanceCurrency()
    }
    if(dataCount === 3){
        return responseHandler.endBalanceCheck({
            currency:data[2]
        })
    }
}