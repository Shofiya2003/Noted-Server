const { Router, application } = require("express");
const express = require("express");
const router = express.Router();
const authMiddleware=require('../middlewares/auth');

// routes
const auth=require('./auth');
const video = require("./video");
const folders = require("./folders");
const videos = require("./videos");
const timestamp = require("./timestamp");
const search = require("./search");
//Middleware

router.use('/v1/auth',auth);
router.use("/v1/notes/timestamp",authMiddleware, timestamp);
router.use("/v1/video",authMiddleware,video);
router.use("/v1/folder",authMiddleware, folders);
router.use("/v1/videos",authMiddleware, videos);
router.use("/v1/search",authMiddleware, search);
module.exports = router;
