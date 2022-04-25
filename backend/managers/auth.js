
const User=require('../models/user');
const funcs={};
const bcrypt=require('bcrypt')
const utils=require('../utils/auth');
funcs.findUser=async (query)=>{
    return await User.findOne(query);
}

funcs.createUser=async ({email,username,password})=>{
    const newUser = await User.create({
        email,
        username,
        password:await bcrypt.hash(password, 10),
        folders:[]
      });
  
     newUser.folders.push({folder_name:"default",is_deleted:false,user_id:newUser._id});
     await newUser.save();
     const token=utils.generateJwt({user_id:newUser._id})
     return {newUser,token};
}

funcs.update=async ({query,updateFeat})=>{
    const user=await User.findOneAndUpdate(query,{
        $set:updateFeat
    });
    return user;
}



module.exports=funcs;