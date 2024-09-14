function ResponseHandler (request,response){
    this.request = request
    this.response = response
    this.sendBadGateWayErrorResponse = (data)=>{
        return this.response.status(502).json(data)
    }
    this.sendNotImplemtedErrorResponse = (data)=>{
        return this.response.status(501).json(data)
    }
    this.sendServerErrorResponse = (data)=>{
        return this.response.status(500).json(data)
    }
    this.sendNotFoundError = (data)=>{
        return this.response.status(404).json(data)
    }
    this.sendUnauthorizedResponse = (data)=>{
        return this.response.status(401).json(data)
    }
    this.sendBadRequestResponse= (data)=>{
        return this.response.status(400).json(data)
    }
    this.acceptedCreatedResponse = (data)=>{
        return this.response.status(202).json(data)
    }
    this.sendCreatedResponse = (data)=>{
        return this.response.status(201).json(data)
    }
    this.sendOkResponse = (data)=>{
        return this.response.status(200).json(data)
    }
    this.sendResponse = (statusCode,data)=>{
        return this.response.status(statusCode).json(data)
    }
}

module.exports.ResponseHandler = ResponseHandler