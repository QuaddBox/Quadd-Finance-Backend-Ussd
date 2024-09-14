const { getDatabaseFile } = require("./middlewares/ussd/useUserDetails");
const { UserLocalModel } = require("./models/localDb/users");

async function main(){
    const data = await UserLocalModel.getOne({
        phone:"+2349032137908"
    })
    return data
}


main().then((data)=>{
    if(data){
        console.log(data)
    }
}).catch(err=>{
    console.log(err);
    process.exit(1);
})