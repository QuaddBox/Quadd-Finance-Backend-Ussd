import axios from "axios";
import { ussdResponses,ussdBalanceResponse, ussdTransferResponse } from "../lib/ussdResponses.js";
import User from "../models/user.js";
import { createDid } from "./tbDexServices.js";

export class USSDService {
    constructor(res,req){
        this.res = res
    }
    responses = ussdResponses
    balanceResponses = ussdBalanceResponse
    transferResponses = ussdTransferResponse

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
    sendIncorrectPinResponse =  () =>{
        this.res.send(this.balanceResponses.incorrect_pin)
    }
    endBalanceCheck = async({currency,amount}) =>{
        this.res.send(this.balanceResponses.balance_end(currency,amount))
    }
    startTransfer = async()=>{
        return this.res.send(this.transferResponses.sender_currency)
    }
    addRecieverCurrency = async()=>{
        return this.res.send(this.transferResponses.reciever_currency)
    }
    addReciever = async()=>{
        return this.res.send(this.res.send(this.transferResponses.reciever))
    } 
    addAmount = ()=>{
        return this.res.send(this.res.send(this.transferResponses.enter_amount))
    }
    enterPin = () => {
        return this.res.send(this.transferResponses.confirm_transfer)
    }
    sendInsufficientFundsResponse=()=>[
        this.res.send(this.transferResponses.insuffucient_funds)
    ]
    sendInvalidUserResponse = () =>{
        return this.res.send(this.transferResponses.invalid_user)
    }
    endTransfer = (currency,amount,reciever) => {
        return this.res.send(this.transferResponses.finish_transfer(currency,amount,reciever))
    }

}
