const express = require("express");
const router = express.Router();
const requestHandler = require("./requestHandler");
const folder=require('../services/folder');

router.post("/create", requestHandler.handlerequest(async (req,res,next)=>{
    await folder.createFolder({user_id:req.decodedTokenData.user_id,body:req.body});
    return res.status(200).json({message:"success"});
}));
router.post("/delete", requestHandler.handlerequest(async (req,res,next)=>{
    await folder.deleteFolder({user_id:req.decodedTokenData.user_id,body:req.body});
    return res.status(200).json({message:"success"});
}));
router.get("/getfolders", requestHandler.handlerequest(async (req,res,next)=>{
    const folders=await folder.getFolders({user_id:req.decodedTokenData.user_id,query:req.query});
    return res.status(200).json({message:"success",folders:folders});
}));
router.post("/editname",requestHandler.handlerequest(async (req,res,next)=>{
    await folder.editName({user_id:req.decodedTokenData.user_id,body:req.body});
    return res.status(200).json({message:"success"});
}));
module.exports = router;
