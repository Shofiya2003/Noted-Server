const express = require("express");
const router = express.Router();
const requestHandler=require('./requestHandler');
const video =require('../managers/video');

//Get all videos bug to be solved
// router.get("/",requestHandler.handlerequest(async (req,res)=>{
//     const { user_id } = req.decodedTokenData;
//     const videos=await video.getAll({user_id,query:req.query});
//      return res.status(200).json({message:'success',videos})
//   }))

module.exports = router;
