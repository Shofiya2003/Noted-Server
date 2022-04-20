
const authManager=require('../managers/auth');
const { generateJwt } = require('../utils/auth');
const bcrypt=require('bcrypt');

const funcs={};
funcs.signup=async ({email,username,password})=>{
    if(await findUserWithUsername({username})){
        throw{
            message: `User with username already exists.`,
            status: 400
        }
    }
    if(await findUserWithEmail({email})){
        throw{
            message:`User with email already exists.`,
            status:400
        }
    }
    try{
        const user=await authManager.createUser({username,password,email});
        return user;
    }
    catch(err){
        throw err;
    }
    
}
funcs.signin=async ({email,password})=>{
    
    const user=await authManager.findUser({email});
    if(!user){
        throw{
            message:"user not found",
            status:404
        }
    }
    if(await bcrypt.compare(password, user.password)){
        const token=generateJwt({user_id:user._id});
        return {user,token};
    }
    else{
        throw{
            message:"invalid password",
            status:401
        }
    }
    
}

const findUserWithUsername=async (query)=>{
    return await authManager.findUser(query);
}

const findUserWithEmail=async (query)=>{
    return await authManager.findUser(query);
}

module.exports=funcs;