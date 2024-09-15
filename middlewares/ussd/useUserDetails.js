import User from "../../models/user.js";

export const useUserDetails = async(req,res,next) => {
    const {phoneNumber} = req.body;
    console.log(phoneNumber);   
    try{
        const queryRes = await User.findOne({
            phoneNumber
        })
        console.log(queryRes);
        if(queryRes && queryRes.data){
            req.user = queryRes.data
        }
    }catch(error){
        console.log(error)
    }
    next()

}