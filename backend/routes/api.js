const { Router, application } = require("express");
const express = require("express");
const router = express.Router();

// routes

const signup = require("./signup");
const signin = require("./signin");
const changepassword = require("./changepassword");
const video = require("./video");
const folders = require("./folders");
const videos = require("./videos");
const timestamp = require("./timestamp");
const search = require("./search");
//Middleware

router.use("/v1/auth", signup);
router.use("/v1/auth/signin", signin);
router.use("/v1/resetpassword", changepassword);
router.use("/v1/notes/timestamp", timestamp);
router.use("/v1/video", video);
router.use("/v1/folder", folders);
router.use("/v1/videos", videos);
router.use("/v1/search", search);
module.exports = router;
