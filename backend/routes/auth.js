const express = require("express");
const router = express.Router();
const requestHandler = require("./requestHandler");
const service=require('../services/auth');
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

module.exports=router
