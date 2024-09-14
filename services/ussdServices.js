const { ussdResponses,ussdBalanceResponse } = require("../lib/ussdResponses")
const { UserLocalModel } = require("../models/localDb/users")

const USSDService = function (res) {
    this.res = res
    this.responses = ussdResponses
    this.balanceResponses = ussdBalanceResponse
    this.sendWelcomeResponse = ()=>{
        return this.res.send(this.responses.welcome)
    }
    this.sendMainWelcomeResponse=()=>{
        this.res.send(this.balanceResponses.welcome)
    }
    this.handleRegisterDefault = async(payload) =>{
        console.log({payload})
        this.res.send(this.responses.register_default)
    }
    this.handleRegisterPhone = async(payload) =>{
        console.log({payload})
        this.res.send(this.responses.register_phone)
    }
    this.handleRegisterPin = async(payload) =>{
        this.res.send(this.responses.register_pin)
    }
    this.endRegisteration = async({name,phone,pin}) =>{
        UserLocalModel.addOne({name,phone,pin})
        this.res.send(this.responses.register_end(name,phone))
    }
    this.checkBalanceStart = async() =>{
        this.res.send(this.balanceResponses.balance_start)
    }
    this.checkBalanceCurrency = async() =>{
        this.res.send(this.balanceResponses.balance_currency)
    }
    this.endBalanceCheck = async({currency}) =>{
        this.res.send(this.balanceResponses.balance_end(currency))
    }
}

module.exports.USSDService = USSDService