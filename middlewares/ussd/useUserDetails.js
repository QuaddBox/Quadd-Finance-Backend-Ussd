import User from "../../models/user.js";

export const useUserDetails = async(req,res,next) => {
    const {phoneNumber} = req.body;
    try{
        const queryRes = await User.findOne({
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