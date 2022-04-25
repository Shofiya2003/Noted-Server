
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

funcs.changePassword=async ({user_id,body:{oldPassword, newPassword, confirmPassword}})=>{
    if (confirmPassword !== newPassword) {
        throw{
            message:"confirm password and new password do not match",
            status:400
        }
    }
    const user=await authManager.findUser({_id:user_id});
    console.log(user);
    try{
        const isPasswordValid=await bcrypt.compare(oldPassword, user.password);
        if(isPasswordValid){
            const newHashedPassword=await bcrypt.hash(newPassword,10);
            await authManager.update({query:{_id:user_id},updateFeat:{password:newHashedPassword}});
        }
        else {
            throw{
                message:"invalid password",
                status:401
            }
        }
    }catch(err){
        throw err;
    }

}

const findUserWithUsername=async (query)=>{
    return await authManager.findUser(query);
}

const findUserWithEmail=async (query)=>{
    return await authManager.findUser(query);
}

module.exports=funcs;