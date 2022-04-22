const express = require("express");
const router = express.Router();
const requestHandler=require('./requestHandler');
const search=require('../services/search');
router.get("/video",requestHandler.handlerequest(async (req,res,next)=>{
    search.searchVideo({user_id:req.decodedTokenData})
}) );
module.exports = router;
