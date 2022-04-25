const express = require("express");
const router = express.Router();
const requestHandler = require("./requestHandler");
const service=require('../services/auth');
const authMiddleware=require('../middlewares/auth');
const funcs = require("./requestHandler");
router.post(
  "/signup",
  requestHandler.handlerequest(async (req, res, next) => {
      const user=await service.signup(req.body);
      return res.status(200).json({message:'success',token:user.token});
  })
);

router.post(
  "/signin",
  requestHandler.handlerequest(async (req, res, next) => {
      const user=await service.signin(req.body);
      return res.status(200).json({message:'success',token:user.token});
  })
);

router.post("/changepassword",authMiddleware,requestHandler.handlerequest(async (req,res,next)=>{
    await service.changePassword({user_id:req.decodedTokenData.user_id,body:req.body});
    return res.status(200).json({message:"success"});
}))

module.exports=router
