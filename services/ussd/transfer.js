import User from "../../models/user.js"
import { USSDService } from "../ussdServices.js"

export const transferHandler = async ({res,user,data,dataCount})=>{

    console.log({data,dataCount})

    const responseHandler = new USSDService(res)

    if(dataCount === 2)  return responseHandler.startTransfer()
        if(dataCount === 3)  return responseHandler.addRecieverCurrency()
        if(dataCount === 4)  return responseHandler.addReciever()
        if(dataCount === 5)  {
        const phoneNumber = data[dataCount-1]
        const reciever = await User.findOne({phoneNumber})
        if(!reciever) return responseHandler.sendInvalidUserResponse()
        return responseHandler.addAmount
    }
    if(dataCount === 6){
        const amount = parseFloat(data[dataCount-1])
        if (user.balance < amount) return responseHandler.sendInsufficientFundsResponse()
        return responseHandler.enterPin()
    }
    if(dataCount === 7)  {
        if(data[dataCount-1] !== user.pin) return responseHandler.sendIncorrectPinResponse()
        return responseHandler.endTransfer("USDT",30000,+2349034567889)
    }
}