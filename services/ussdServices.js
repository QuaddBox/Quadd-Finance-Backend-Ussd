import axios from "axios";
import { ussdResponses,ussdBalanceResponse } from "../lib/ussdResponses.js";

export class USSDService {
    constructor(res,req){
        this.res = res
    }
    responses = ussdResponses
    balanceResponses = ussdBalanceResponse

    sendWelcomeResponse = async()=>{
        return this.res.send(this.responses.welcome)
    }
    sendMainWelcomeResponse=()=>{
        this.res.send(this.balanceResponses.welcome)
    }
    handleRegisterDefault = async(payload) =>{
        console.log({payload})
        this.res.send(this.responses.register_default)
    }
    handleRegisterPhone = async(payload) =>{
        console.log({payload})
        this.res.send(this.responses.register_phone)
    }
    handleRegisterPin = async(payload) =>{
        this.res.send(this.responses.register_pin)
    }
    endRegisteration = async({name,phone:phoneNumber,pin}) =>{
        try {
            const did = await createDid();
            const newUser = new User({ name, phoneNumber, did, pin });
            await newUser.save();
            this.res.send(this.responses.register_end(name,phoneNumber))
        } catch (error) {
            console.log(error)
            this.res.send(this.responses.default)
        }
    }
    checkBalanceStart = async() =>{
        this.res.send(this.balanceResponses.balance_start)
    }
    checkBalanceCurrency = async() =>{
        this.res.send(this.balanceResponses.balance_currency)
    }
    endBalanceCheck = async({currency,amount}) =>{
        this.res.send(this.balanceResponses.balance_end(currency,amount))
    }
}
