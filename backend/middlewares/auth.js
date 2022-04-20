const jwt=require('jsonwebtoken');
module.exports=async (req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader){
        return res.status(400).json({message:"JWT token is missing"});
    }
    const token=authHeader.split(" ")[1];
    try{
        const user = await jwt.verify(token, process.env.JWT_AUTH_SECRET);
        if(!user){
            throw{
                message:"Invalid JWT token"
            }
        }
        console.log(user);
        req.decodedTokenData=user;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json(err.message?err:{
            message:"Failed to verify JWT Token"
        })
    }
}