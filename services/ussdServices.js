import axios from "axios";
import { ussdResponses,ussdBalanceResponse } from "../lib/ussdResponses.js";

export class USSDService {
    constructor(res){
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
    endRegisteration = async({name,phone,pin}) =>{
        try {
            const response = await axios.post(`/api/auth/register`,{name,phone,pin})
            .then(data=>data)
            .catch(err=>{
                console.log(err)
                this.res.send(this.responses.default)
            });
            this.res.send(this.responses.register_end(name,phone))
        } catch (error) {
            this.res.send(this.responses.default)
        }
    }
    checkBalanceStart = async() =>{
        this.res.send(this.balanceResponses.balance_start)
    }
    checkBalanceCurrency = async() =>{
        this.res.send(this.balanceResponses.balance_currency)
    }
    endBalanceCheck = async({currency}) =>{
        this.res.send(this.balanceResponses.balance_end(currency))
    }
}
