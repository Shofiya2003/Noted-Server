const express = require("express");
const router = express.Router();
const requestHandler = require("./requestHandler");
const folder=require('../services/folder');

router.post("/create", requestHandler.handlerequest(async (req,res,next)=>{
    
}));
router.post("/delete", requestHandler.handlerequest(async (req,res,next)=>{

}));
router.get("/getfolders", requestHandler.handlerequest(async (req,res,next)=>{
    
}));
router.post("/editname",requestHandler.handlerequest(async (req,res,next)=>{
    
}));
module.exports = router;
