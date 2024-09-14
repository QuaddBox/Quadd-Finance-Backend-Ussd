const { findOne } = require("../../models/user");

module.exports.useUserDetails = async(req,res,next) => {
    const {phoneNumber} = req.body;
    try{
        const queryRes = await findOne({
            phoneNumber
        })
        if(queryRes.data){
            req.user = queryRes.data
        }
    }catch(error){
        console.log(error.message)
    }
    next()

}