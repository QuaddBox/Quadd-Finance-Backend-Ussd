import User from "../../models/user.js";

export const useUserDetails = async(req,res,next) => {
    const {phoneNumber} = req.body;

    try{
        const queryRes = await User.findOne({phoneNumber})
        if(queryRes){
            req.user = queryRes
            console.log({
                pin:user.pin
            })
        }
    }catch(error){
        console.log(error)
    }
    next()

}